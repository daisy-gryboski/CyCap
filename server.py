from flask import Flask, request, jsonify, session
from flask_cors import CORS
import logging
import sys
import sqlite3
import hashlib
import os
from datetime import datetime, timedelta

app = Flask(__name__)
app.secret_key = os.urandom(24)  # For session management
CORS(app, supports_credentials=True)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    stream=sys.stdout
)
logger = logging.getLogger(__name__)

# Initialize database
def init_db():
    conn = sqlite3.connect('cycap.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

# Hash password
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

@app.route('/api/auth/register', methods=['POST'])
def register():
    try:
        data = request.json
        if not data or 'username' not in data or 'password' not in data:
            return jsonify({
                "error": "Username and password are required",
                "status": "error"
            }), 400

        username = data['username']
        password = data['password']
        
        # Hash the password
        password_hash = hash_password(password)
        
        # Store in database
        conn = sqlite3.connect('cycap.db')
        c = conn.cursor()
        try:
            c.execute('INSERT INTO users (username, password_hash) VALUES (?, ?)',
                     (username, password_hash))
            conn.commit()
            
            # Set session
            session['user_id'] = c.lastrowid
            session['username'] = username
            
            return jsonify({
                "status": "success",
                "message": "Account created successfully"
            })
        except sqlite3.IntegrityError:
            return jsonify({
                "error": "Username already exists",
                "status": "error"
            }), 409
        finally:
            conn.close()
            
    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        return jsonify({
            "error": str(e),
            "status": "error"
        }), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.json
        if not data or 'username' not in data or 'password' not in data:
            return jsonify({
                "error": "Username and password are required",
                "status": "error"
            }), 400

        username = data['username']
        password = data['password']
        password_hash = hash_password(password)
        
        conn = sqlite3.connect('cycap.db')
        c = conn.cursor()
        try:
            c.execute('SELECT id FROM users WHERE username = ? AND password_hash = ?',
                     (username, password_hash))
            user = c.fetchone()
            
            if user:
                session['user_id'] = user[0]
                session['username'] = username
                return jsonify({
                    "status": "success",
                    "message": "Login successful"
                })
            else:
                return jsonify({
                    "error": "Invalid credentials",
                    "status": "error"
                }), 401
        finally:
            conn.close()
            
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        return jsonify({
            "error": str(e),
            "status": "error"
        }), 500

@app.route('/api/auth/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({
        "status": "success",
        "message": "Logged out successfully"
    })

if __name__ == '__main__':
    # Initialize database
    init_db()
    
    logger.info("Starting CyCap API server on port 5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
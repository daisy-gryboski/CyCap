import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import RobinHood from 'robin-stocks';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Configure CORS to allow requests from Vite dev server
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.static('dist'));

// Store authenticated client in memory
let robinhoodClient = null;

app.post('/api/robinhood/connect', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ 
        status: 'error',
        error: 'Username and password are required'
      });
    }

    try {
      // Login to Robinhood
      const loginResult = await RobinHood.login(username, password);
      
      if (!loginResult) {
        return res.status(401).json({
          status: 'error',
          error: 'Invalid credentials'
        });
      }

      // Get account info
      const portfolio = await RobinHood.getPortfolio();
      const positions = await RobinHood.getPositions();

      // Format positions
      const formattedPositions = await Promise.all(
        positions.results
          .filter(p => parseFloat(p.quantity) > 0)
          .map(async p => {
            const instrument = await RobinHood.getInstrument(p.instrument);
            return {
              symbol: instrument.symbol,
              quantity: parseFloat(p.quantity),
              value: parseFloat(p.market_value)
            };
          })
      );

      return res.json({
        status: 'success',
        data: {
          equity: parseFloat(portfolio.equity),
          buying_power: parseFloat(portfolio.buying_power),
          positions: formattedPositions
        }
      });
    } catch (error) {
      console.error('Robinhood API error:', error);
      return res.status(401).json({
        status: 'error',
        error: 'Failed to authenticate with Robinhood'
      });
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      status: 'error',
      error: error.message || 'Internal server error'
    });
  }
});

app.get('/api/robinhood/portfolio', async (req, res) => {
  try {
    if (!RobinHood.auth_token) {
      return res.status(401).json({
        status: 'error',
        error: 'Not authenticated'
      });
    }

    // Get updated portfolio data
    const portfolio = await RobinHood.getPortfolio();
    const positions = await RobinHood.getPositions();

    // Format positions
    const formattedPositions = await Promise.all(
      positions.results
        .filter(p => parseFloat(p.quantity) > 0)
        .map(async p => {
          const instrument = await RobinHood.getInstrument(p.instrument);
          return {
            symbol: instrument.symbol,
            quantity: parseFloat(p.quantity),
            value: parseFloat(p.market_value)
          };
        })
    );

    return res.json({
      status: 'success',
      data: {
        equity: parseFloat(portfolio.equity),
        buying_power: parseFloat(portfolio.buying_power),
        positions: formattedPositions
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      status: 'error',
      error: error.message || 'Internal server error'
    });
  }
});

// Handle all other routes for SPA
app.get('*', (req, res) => {
  res.sendFile('dist/index.html', { root: __dirname });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
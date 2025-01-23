import robin_stocks.robinhood as r
import logging

class RobinhoodAccount:
    def __init__(self):
        """Initialize the class with user credentials."""
        self.username = None
        self.password = None
        self.logged_in = False

    def login(self):
        """Logs into Robinhood using the stored credentials."""
        try:
            login_result = r.authentication.login(
                username=self.username,
                password=self.password,
                expiresIn=86400,
                by_sms=False
            )

            if login_result and 'access_token' in login_result:
                print("Account connected successfully!")
                self.logged_in = True
            else:
                print("Login failed. Check credentials.")
                self.logged_in = False
        except Exception as e:
            print(f"Error connecting to Robinhood: {e}")
            self.logged_in = False

    def fetch_account_info(self):
        """Fetch and print account information."""
        if not self.logged_in:
            print("You must log in first!")
            return

        try:
            portfolio_info = r.profiles.load_portfolio_profile()

            if portfolio_info is None or not portfolio_info:
                print("No portfolio data available.")
            else:
                print("\n--- Portfolio Information ---")
                print(f"Equity: ${float(portfolio_info['equity']):.2f}")
                print(f"Buying Power: ${float(portfolio_info['buying_power']):.2f}")

                print("\n--- Current Positions ---")
                positions = r.account.get_all_positions()
                for position in positions:
                    if float(position['quantity']) > 0:
                        symbol = r.stocks.get_symbol_by_url(position['instrument'])
                        print(f"Stock: {symbol}")
                        print(f"Quantity: {float(position['quantity']):.2f}")
                        print(f"Market Value: ${float(position['market_value']):.2f}\n")

        except Exception as e:
            print(f"Error fetching account information: {e}")

    def logout(self):
        """Logs out of Robinhood."""
        if self.logged_in:
            try:
                r.authentication.logout()
                print("Successfully logged out.")
                self.logged_in = False
            except Exception as e:
                print(f"Error logging out: {e}")
        else:
            print("You are not logged in.")
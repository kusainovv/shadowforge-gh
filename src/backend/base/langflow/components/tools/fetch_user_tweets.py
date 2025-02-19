import requests
from langflow.schema import Data
from langflow.inputs import MessageTextInput, IntInput, SecretStrInput
from langflow.custom import Component
from langflow.template import Output

class FetchUserTweetsComponent(Component):
    display_name = "Fetch User Tweets"
    description = "Fetch recent tweets of a specified user using the Tweetscout API."
    icon = "ASPIS"
    name = "FetchUserTweets"

    inputs = [
        MessageTextInput(
            name="username",
            display_name="Twitter Username",
            info="Provide the Twitter username without the '@' symbol.",
            required=True,
            tool_mode=True
        ),
        IntInput(
            name="tweet_count",
            display_name="Number of Tweets",
            value=10,
            info="The number of recent tweets to fetch.",
            required=True,
            tool_mode=True
        ),
        SecretStrInput(
            name="api_key",
            display_name="API Key",
            info="Provide the Tweetscout API key.",
            required=True
        )
    ]

    outputs = [
        Output(name="tweets_data", display_name="User Tweets Data", method="fetch_tweets"),
    ]

    def fetch_tweets(self) -> Data:
        """
        Fetch tweets by first retrieving the user ID using the provided username.
        """
        username = self.username.strip()
        tweet_count = self.tweet_count
        api_key = self.api_key

        try:
            user_info_url = f"https://api.tweetscout.io/v2/info/{username}"
            headers = {
                "accept": "application/json",
                "ApiKey": api_key,
            }

            user_response = requests.get(user_info_url, headers=headers)
            user_response.raise_for_status()

            user_data = user_response.json()
            user_id = user_data.get("id")

            if not user_id:
                return Data(value={"error": "Could not retrieve user ID."})

            tweets_url = "https://api.tweetscout.io/v2/user-tweets"
            tweet_payload = {
                "user_id": user_id,
                "limit": tweet_count,
            }

            tweet_response = requests.post(tweets_url, headers=headers, json=tweet_payload)
            tweet_response.raise_for_status()

            tweets = tweet_response.json()
            return Data(value={"tweets": tweets})

        except requests.exceptions.RequestException as e:
            return Data(value={"error": f"API request failed: {e}"})
        except Exception as e:
            return Data(value={"error": f"Unexpected error: {e}"})
# DeepL Translation Setup

This application uses DeepL API for dynamic translation to Slovenian. To enable DeepL translations:

## Setup Instructions

1. Get a DeepL API key:
   - Sign up at https://www.deepl.com/pro-api
   - Get your free API key (free tier includes 500,000 characters/month)

2. Add the API key to your environment:
   - Create or update your `.env` file in the project root
   - Add the following line:
     ```
     VITE_DEEPL_API_KEY=your-deepl-api-key-here
     ```

3. Restart your development server after adding the key

## How It Works

- The application uses static translations from JSON files as the primary source
- DeepL is used as a fallback for any content that needs dynamic translation
- Translations are cached to avoid redundant API calls
- If no API key is provided, the application will use the existing translations from `sl.json`

## Notes

- The DeepL free tier uses `api-free.deepl.com` endpoint
- For production, consider using the paid tier with `api.deepl.com` for better rate limits
- Translations are cached in memory to reduce API calls


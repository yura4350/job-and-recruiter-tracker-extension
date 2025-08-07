# Job & Recruiter Tracker Chrome Extension

A Chrome extension that helps you save and organize interesting job postings and recruiter contacts during your job search. Keep track of opportunities and professional connections all in one convenient place.

## Features

- **Two Separate Categories**: Organize your saved items into Job Postings and Recruiters
- **Quick Save**: Save the current tab with one click or manually add details
- **Rich Information**: Store job titles, recruiter names, companies, and URLs
- **Clean Interface**: Modern, intuitive design with tabbed navigation
- **Local Storage**: All data is stored locally in your browser for privacy
- **Date Tracking**: See when you added each item
- **Easy Management**: Clear individual categories or view counts at a glance

## Screenshots

The extension features a clean, modern interface with:
- Beautiful gradient header
- Tabbed navigation between Job Postings and Recruiters
- Form inputs with proper validation
- Organized lists with hover effects
- Responsive design that works in the Chrome extension popup

## Installation

### From Source (Development)

1. **Download or Clone** this repository to your computer
2. **Open Chrome** and navigate to `chrome://extensions/`
3. **Enable Developer Mode** by toggling the switch in the top right corner
4. **Click "Load unpacked"** and select the folder containing the extension files
5. **Pin the extension** to your toolbar for easy access

### File Structure
```
chrome-extension/
├── manifest.json          # Extension configuration
├── index.html             # Popup interface
├── index.css              # Styling
├── index.js               # Main functionality
├── images/
│   └── icon.png          # Extension icon
└── README.md             # This file
```

## How to Use

### Saving Job Postings

1. **Click the extension icon** in your Chrome toolbar
2. **Go to the "Job Postings" tab** (default)
3. **Add a job posting** in two ways:
   - **Manual Entry**: Fill in the job title (optional) and URL, then click "Save Job"
   - **Current Tab**: While on a job posting page, click "Save Current Tab"

### Saving Recruiters

1. **Switch to the "Recruiters" tab**
2. **Add a recruiter** in two ways:
   - **Manual Entry**: Enter name, company (optional), and contact URL, then click "Save Recruiter"
   - **Current Tab**: While on a recruiter's page (e.g., LinkedIn), click "Save Current Tab" and enter details when prompted

### Managing Your Lists

- **View Counts**: See how many items you've saved in each category
- **Clear Lists**: Use the "Clear All" button to remove all items from a category
- **Open Links**: Click any URL in your lists to open it in a new tab
- **Keyboard Support**: Press Enter in any input field to save

## Interface Guide

### Job Postings Tab
- **Job Title**: Optional field for the position name
- **Job URL**: Required field for the posting link
- **Save Job**: Manual save button
- **Save Current Tab**: Quick save for the active browser tab

### Recruiters Tab
- **Recruiter Name**: Required field for the contact's name
- **Company**: Optional field for their organization
- **Contact URL**: Required field for their profile or contact page
- **Save Recruiter**: Manual save button
- **Save Current Tab**: Quick save with prompts for details

## Data Storage

- All data is stored locally in your browser using `localStorage`
- **Job postings** are saved under the key `savedJobs`
- **Recruiters** are saved under the key `savedRecruiters`
- Data persists between browser sessions
- No data is sent to external servers (privacy-focused)

## Technical Details

### Permissions
- **tabs**: Required to access current tab information for quick saves

### Browser Compatibility
- Chrome (Manifest V3)
- Microsoft Edge (Chromium-based)
- Other Chromium-based browsers

### Key Technologies
- **Vanilla JavaScript**: No external dependencies
- **CSS3**: Modern styling with gradients and animations
- **Chrome Extensions API**: For tab access
- **LocalStorage**: For data persistence

## Privacy & Security

- **Local Storage Only**: All data stays on your device
- **No Network Requests**: Extension doesn't communicate with external servers
- **No Tracking**: No analytics or user behavior tracking
- **XSS Protection**: All user input is properly escaped before display

## Development

### Modifying the Extension

1. **Edit the files** as needed
2. **Reload the extension** in `chrome://extensions/` by clicking the refresh icon
3. **Test changes** by opening the popup

### Key Files
- `manifest.json`: Extension metadata and permissions
- `index.html`: Popup structure and layout
- `index.css`: All styling and visual design
- `index.js`: Core functionality and event handling

### Adding Features

The code is well-structured for adding new features:
- **Data handling**: Functions like `saveJob()` and `saveRecruiter()`
- **UI updates**: Rendering functions like `renderJobs()` and `renderRecruiters()`
- **Storage**: Centralized in `loadData()` and localStorage calls

## Future Enhancements

Potential improvements for future versions:
- **Export/Import**: Backup and restore data
- **Search/Filter**: Find specific jobs or recruiters
- **Notes**: Add personal notes to each entry
- **Categories**: Custom tags or categories
- **Duplicate Detection**: Prevent saving the same URL twice
- **Dark Mode**: Alternative color scheme

## Troubleshooting

### Extension Not Loading
- Check that all files are in the same folder
- Verify the `manifest.json` file is valid
- Make sure Developer Mode is enabled

### Data Not Saving
- Check browser permissions
- Ensure localStorage is enabled
- Try clearing browser cache and reloading extension

### Popup Not Opening
- Right-click the extension icon and check for errors
- Reload the extension in `chrome://extensions/`
- Check browser console for JavaScript errors

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to fork this project and submit pull requests for improvements!

---

**Happy job hunting!** Keep your opportunities organized and never lose track of important contacts again.

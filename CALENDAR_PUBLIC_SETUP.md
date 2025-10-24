# Making Google Calendar Public for Website Embed

## Issue
When users visit your Netlify site on mobile devices, they see an error:
**"Allow Google Calendar access to your necessary cookies"**

## Why This Happens
Google Calendar iframe embeds require the calendar to be publicly accessible. If the calendar is private, Google tries to authenticate the user, which causes cookie permission issues, especially on mobile browsers with strict privacy settings.

## Solution: Make the Calendar Public

### Step 1: Access Google Calendar Settings

1. Go to **Google Calendar**: https://calendar.google.com
2. Sign in with the account that owns `olfperthamboy@gmail.com`
3. In the left sidebar, find the calendar you want to share
4. Click the **three dots (⋮)** next to the calendar name
5. Select **"Settings and sharing"**

### Step 2: Make Calendar Public

1. Scroll down to the **"Access permissions for events"** section
2. Check the box: ☑️ **"Make available to public"**
3. Choose visibility level:
   - **"See all event details"** (Recommended) - Shows full event information
   - **"See only free/busy (hide details)"** - Only shows if time slot is busy

### Step 3: Get Public Calendar Address

1. Scroll down to **"Integrate calendar"** section
2. Copy the **"Public address in iCal format"** link
3. This confirms your calendar is now public

### Step 4: Verify Public Access

1. Open an incognito/private browser window
2. Paste this URL (replace with your calendar email):
   ```
   https://calendar.google.com/calendar/embed?src=olfperthamboy@gmail.com
   ```
3. You should see the calendar **without** being asked to sign in
4. If it asks for login, the calendar is not public yet

## Testing the Website

After making the calendar public:

1. **Clear your browser cache** (important!)
2. Visit your Netlify site on mobile
3. Navigate to the Events page
4. The calendar should now load without cookie errors

## Alternative: Use Direct Calendar Link

If users still have issues with the iframe embed, the updated component now includes:

1. **"Open in Google Calendar"** button - Opens calendar in Google Calendar app/browser
2. **"Subscribe (iCal)"** button - Downloads calendar subscription file
3. **Mobile help text** - Tells users to try the Google Calendar app

## Mobile-Specific Solutions

### For iPhone/iPad Users:
1. Click "Open in Google Calendar"
2. Opens in Safari or Google Calendar app
3. Can add to iPhone Calendar app via subscription

### For Android Users:
1. Click "Open in Google Calendar"
2. Opens in Google Calendar app (if installed)
3. Or opens in mobile browser

## Security Considerations

### What Gets Shared Publicly:
- ✅ Event titles
- ✅ Event dates and times
- ✅ Event descriptions
- ✅ Event locations

### What Stays Private:
- ❌ Guest list (email addresses of attendees)
- ❌ Calendar owner's email
- ❌ Private events (marked as "Private")
- ❌ Event invitations and responses

### Best Practices:
1. Only add public parish events to this calendar
2. For internal/staff events, use a separate private calendar
3. Review events monthly to ensure appropriate content
4. Don't include sensitive information in event descriptions

## Troubleshooting

### Problem: Calendar still shows cookie error
**Solution**:
- Wait 5-10 minutes for Google's cache to update
- Clear browser cache completely
- Try in incognito mode

### Problem: Some events don't show
**Solution**:
- Check individual event settings (they may be marked "Private")
- Make sure event dates are in the future
- Verify calendar sync if using multiple devices

### Problem: Calendar shows in English but want Spanish
**Solution**:
- Calendar language is based on user's Google account settings
- Users can change their Google Calendar language preference
- Or use the bilingual event cards below the calendar embed

## Need Help?

If issues persist:
1. Verify calendar is public (Step 2 above)
2. Test in incognito browser
3. Check browser console for specific errors (F12 → Console)
4. Try the "Open in Google Calendar" button as fallback

## Calendar Privacy Settings Summary

```
✅ Public Calendar Settings:
├── Access permissions: "Make available to public" ☑️
├── Visibility: "See all event details"
├── Public URL: Available
└── iCal subscription: Available

❌ Keep Private:
├── Guest lists
├── Event RSVPs
├── Internal notes
└── Calendar owner info
```

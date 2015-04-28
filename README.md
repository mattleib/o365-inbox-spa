# o365-inbox-spa
###Single Page App using CORS and ADAL.JS and Microsoft Graph to call Office 365 APIs

Requires: 
- Existing Office 365 Tenant with users. 
- A developer tenant can be requested here: 
[Get me an Office 365 Developer Tenat](https://portal.office.com/Signup/Signup.aspx?OfferId=6881A1CB-F4EB-4db3-9F18-388898DAF510&DL=DEVELOPERPACK&ali=1#0)

Install:
- Install node.js from https://nodejs.org/
- Install Python (version 2.7.x) from https://www.python.org/downloads/ 
- Clone this repository into a local directory
- Open command prompt in the directory and run "npm start"
- Open Web Browser of your choice with CORS support and type https://localhost:8080

See it in action (requires valid Office 365 account):
- Go to: https://o365.azurewebsites.net
- Note: Currently "Messages" and "My Files" are working. Upon deployment speed of Office 365 APIs more and more will light up.

###APIs used

####Messages: List messages in your inbox, delete a message, send a message.
- Messages: https://graph.microsoft.com/beta
- /me/messages -> list of messages</li>
- /me/sendmail -> send a message </li>
- /me/messages/{msg-id} -> delete a message
- /me/messages/?search -> search messages by keyword

####My Groups: List groups you are a member off, group conversations, posts, group calendar and group files.
- Groups: https://graph.microsoft.com/beta
- /me/joinedGroups -> Groups you are a member-of
- /myorganization/{group-id}/conversations -> get Group conversations
- /myorganization/{group-id}/calendar/events -> get Groups events
- /myorganization/{group-id}/calendar/files -> get Groups files
- /myorganization/{group-id}/conversations/{id}/threads/ -> get and post to conversation

####My Files: See the list of your files on your OneDrive for Business.
- Files: https://graph.microsoft.com/beta
- /me/files -> My files

####About Me: This shows your profile and organization information.
- Profile: https://graph.microsoft.com/beta/me</li>
- Manager: https://graph.microsoft.com/beta/me/manager</li>
- Reports: https://graph.microsoft.com/beta/me/directReports</li>





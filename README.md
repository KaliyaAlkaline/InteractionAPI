# InteractionsAPI
With the new enforcement of interaction commands in Discord, I have created a small REST API designed to automate interaction commands. Note that I am not responsible for how anyone uses this code, selfbotting on Discord is strictly prohibited and will get your account banned if someone reports it. You have been warned.

# Setup Info
To use the REST API, you will first need to host it. If you go into the InteractionsAPI folder, you can find Instructions.txt which will tell you the setup requirements. Note that Node JS and npm are a requirement. You can either host the server from your own pc (it automatically hosts on port 3001) or you can try and find a service to host it for you. If you wish to change the port or the host, you will have to edit the main server code as well as the provided client-side code.

The clientside.js file contains a couple functions that will allow you to interact with the API (InteractionsAPI.post and InteractionsAPI.request). The post function will allow you to upload interaction data (more on this later) to the server database. Upon sending data, you will either get a 200 code or 400 code response. If the response is 200, it will add the data to the database and return a string associated with it. This string is referred to as the key object in the API. If the data you provide is already in the database, the server will return a 400 error along with the key that's already assigned to it. If the request function has no affect on Discord, then it will have failed. However, the request function does not return an error when Discord returns an error. If you don't provide the needed headers for either function, they will return a 401 error.

# Useage examples (client side)
Note: All the info including tokens, channel IDs, and keys is forged.

//Send data

InteractionsAPI.post({"type":2,"application_id":"512079641981353995","guild_id":"1009406265736036352","channel_id":"1009406269640933376","session_id":"go2f97f32igqfwfqk13rd2yuk","data":{"version":"1000100476039209103","id":"1000100475598815271","name":"collect","type":1,"options":[],"application_command":{"id":"1000100475598815271","application_id":"512079641981353995","version":"1000100476039209103","default_permission":true,"default_member_permissions":null,"type":1,"name":"collect","description":"Collect your income","dm_permission":true},"attachments":[]},"nonce":"1009406272757301248"})

//Returns "m_c$9HSrpo"
​


//Send a request

InteractionsAPI.request("MTAwOTQwMzQ3NTQ4Nzg4MzI2NA.GP26Wa.H_qSHbKFHjA07mRqBVQZXkQB1st-Z7muGIcbrs", "1009403475487883264", "m_c$9HSrpo")

//Returns "Request sent"

# How to get interaction data
This API would be useless without the Discord interaction data it needs to automate. To get this info, you will first need to use ctrl+shift+i to get into inspect element. You can either do this from the site or from the desktop application itself, it doesn't matter since Discord was built using Electron. After you've opened inspect element, navigate to the Network tab and type "API" into the filter field. Afterwards, run your chosen slash command. After running the command, a new object should appear on the list under the name "interactions". Click on this object and it will open up a list of headers. Navigate over to the payload section and copy the compressed JSON data, this is the interaction data to send through the API.

#Conclusion
I was bored.

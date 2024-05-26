const express = require('express'); 
const escapeHtml = require('escape-html');
const app = express(); 

const port = 3000; 

app.get('/', (req, res) => {   
	// Assume these strings are submitted by a user   
	const userInput1 = "This is some <script>alert('malicious')</script> text";   
	const userInput2 = '<script>alert("users")</script>';
	const userInput3 = '<script>alert("are everywhere")</script>';   
	const userInput4 = "Is your name O'Reilly?";   
	
	const safeHtml = `     
		<!DOCTYPE html>     
		<html>     
			<head>       
				<title>Simple Example of Output Escaping (HTML Sanitization)</title>     
			</head>     
			<body>       
				${escapeHtml(userInput1)}       
				<hr>       
				${escapeHtml(userInput2)}       
				<hr>       
				${userInput3.replace(/<script.*?>.*?<\/script>/ig, '')}   
				<hr> ${userInput4.replace(/['"\\]/g, '\\$&')}     
			</body>     
		</html>`;     
	
	res.send(safeHtml); 
}); 
	
app.listen(port, () => { 
	console.log(`Example app listening at http://localhost:${port}`); 
}); 
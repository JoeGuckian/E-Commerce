# Guidance

To run the project: `npm start`

To run the tests `npm test`

# Comments

1. Error handling example is in the login page component. None of the other api calls used for this test seemed to throw an error when incorrect parameters were passed.
   - There could be more error handling around context usage and ensuring the hook is called within a provider
2. As I'm short of time I've added tests to the product feature to demonstrate different types of testing, but I've not expanded beyond this
3. I've used inline styles to get basic styling up and running quickly. In production inline styles would not be appropriate and I would either use a cssinJS module or css/sass files.
4. If I had more time I would separate out the components in the layout feature as well
5. For ease of visibility and understanding I've left all types and functions relating to the context in the context file. These could be broken out into their own files for cleaner coding practices
6. I've not added handling for loading states during fetch in this demo
7. I've mainly focussed on css for layout rather than making it visually pleasing. I've used the category cards as the main example of where I've focused more on the visual side of things.

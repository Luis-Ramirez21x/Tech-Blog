console.log('test-connection');
const createCommentFormHandler = async (event) =>{
    event.preventDefault()
    console.log('testing-function');
    //get values from form 
    const content = document.querySelector('#comment').value.trim();
    

    if (content) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({ content }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          // If successful, redirect the browser to the profile page
          document.location.reload();
        } else {
          alert(response.statusText);
          console.log('please fill out the text field');
        }
      }
};

document.querySelector('.blog-form').addEventListener('submit', createCommentFormHandler);
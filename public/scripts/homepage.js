if (document.querySelector('#postingDiv')) {
    $postButton = document.querySelector("#postSubmit");

    const formSubmitHandler = async ()=> {
        let title = document.querySelector("#newPostTitle").value.trim()
        let post_content = document.querySelector("#newPostBody").value.trim()

        if (title && post_content) {
            const response = await fetch('/api/blogpost/', {
                method: 'POST',
                body: JSON.stringify({ title, post_content }),
                headers: { 'Content-Type': 'application/json' },
            });
            (response.ok) ? document.location.reload() : alert('Failed to Post');
        } else {
            alert("Text field cannot be empty")
        }
    }

    $postButton.addEventListener('click', formSubmitHandler)
}

if (document.querySelectorAll(".postCommentSubmit")) {
    $commentBTN = document.querySelectorAll(".postCommentSubmit");

    const commentSubmitHandler = async (e)=> {
        let comment_content = e.target.previousElementSibling.lastElementChild.value;
        let post_id = e.target.parentNode.parentNode.getAttribute("data-post");


        if (comment_content) {
            const response = await fetch('/api/comment', {
                method: 'POST',
                body: JSON.stringify({ comment_content, post_id }),
                headers: { 'Content-Type': 'application/json' },
            });
            (response.ok) ? document.location.reload() : alert('Failed to Post');
        } else {
            alert("Comment field cannot be empty")
        }
    }

    $commentBTN.forEach((button) => {
        button.addEventListener("click", commentSubmitHandler);
    });
}
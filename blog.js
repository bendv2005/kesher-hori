document.addEventListener('DOMContentLoaded', function() {
    const API_KEY = 'YOUR_API_KEY'; // <-- PASTE YOUR API KEY HERE
    const SHEET_ID = '1iOrIKNymNYSZPX0zVGTQNvxeQgWe3QhVMtSRj8yH1nY';
    const RANGE = 'A2:D'; // Assuming your data is in columns A to D, starting from row 2

    const postsContainer = document.getElementById('posts-container');

    if (postsContainer) {
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                const posts = data.values;
                if (posts && posts.length > 0) {
                    posts.forEach(post => {
                        const [id, title, content, createdAt] = post;
                        const postElement = document.createElement('article');
                        postElement.innerHTML = `
                            <h4>${title}</h4>
                            <p>${content}</p>
                            <small>${createdAt}</small>
                        `;
                        postsContainer.appendChild(postElement);
                    });
                } else {
                    postsContainer.innerHTML = '<p>No blog posts found.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching blog posts:', error);
                postsContainer.innerHTML = '<p>There was an error loading the blog posts.</p>';
            });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const CLOUD_RUN_SERVICE_URL = 'https://blogkesherhori-422760875497.europe-west1.run.app'; // Your deployed Cloud Run service URL

    const postsContainer = document.getElementById('posts-container');

    if (postsContainer) {
        fetch(CLOUD_RUN_SERVICE_URL)
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

document.addEventListener('DOMContentLoaded', function() {
    const CLOUD_RUN_SERVICE_URL = 'https://blogkesherhori-422760875497.europe-west1.run.app'; // Your deployed Cloud Run service URL

    const postsContainer = document.getElementById('posts-container');

    if (postsContainer) {
        fetch(CLOUD_RUN_SERVICE_URL)
            .then(response => response.json())
            .then(data => {
                const posts = data;
                if (posts && posts.length > 0) {
                    posts.forEach(post => {
                        const postElement = document.createElement('article');
                        postElement.classList.add('blog-post-card'); // Add a class for styling

                        let featuredImageHtml = '';
                        if (post.featuredImage) {
                            featuredImageHtml = `<div class="post-image"><img src="${post.featuredImage}" alt="${post.title}"></div>`;
                        }

                        postElement.innerHTML = `
                            ${featuredImageHtml}
                            <div class="post-content">
                                <h4>${post.title}</h4>
                                <p class="post-excerpt">${post.excerpt}</p>
                                <div class="post-meta">
                                    <span>מאת: ${post.author}</span>
                                    <span>פורסם ב: ${new Date(post.publishDate).toLocaleDateString('he-IL')}</span>
                                </div>
                                <a href="${post.slug ? 'blog/' + post.slug + '.html' : '#'}" class="read-more-link">קרא עוד</a>
                            </div>
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

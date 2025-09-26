document.addEventListener('DOMContentLoaded', function() {
    const CLOUD_RUN_SERVICE_URL = 'https://blogkesherhori-422760875497.europe-west1.run.app'; // Your deployed Cloud Run service URL
    const postsContainer = document.getElementById('posts-container');
    const urlParams = new URLSearchParams(window.location.search);
    const requestedSlug = urlParams.get('slug');

    if (postsContainer) {
        fetch(CLOUD_RUN_SERVICE_URL)
            .then(response => response.json())
            .then(posts => {
                if (posts && posts.length > 0) {
                    if (requestedSlug) {
                        // Render single post view
                        const singlePost = posts.find(post => post.slug === requestedSlug);
                        if (singlePost) {
                            postsContainer.innerHTML = `
                                <div class="single-post-view">
                                    <a href="blog.html" class="back-to-blog-link">← חזרה לבלוג</a>
                                    ${singlePost.featuredImage ? `<div class="single-post-image"><img src="${singlePost.featuredImage}" alt="${singlePost.title}"></div>` : ''}
                                    <h1>${singlePost.title}</h1>
                                    <div class="single-post-meta">
                                        <span>מאת: ${singlePost.author}</span>
                                        <span>פורסם ב: ${new Date(singlePost.publishDate).toLocaleDateString('he-IL')}</span>
                                    </div>
                                    <div class="single-post-body">${singlePost.body.replace(/\n/g, '<br>')}</div>
                                    ${singlePost.tags && singlePost.tags.length > 0 ? `<div class="single-post-tags">תגיות: ${singlePost.tags.map(tag => `<span>#${tag}</span>`).join(' ')}</div>` : ''}
                                    ${singlePost.ctaText && singlePost.ctaLink ? `<a href="${singlePost.ctaLink}" class="single-post-cta">${singlePost.ctaText}</a>` : ''}
                                </div>
                            `;
                        } else {
                            postsContainer.innerHTML = '<p>פוסט לא נמצא.</p>';
                        }
                    } else {
                        // Render list of posts view
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
                                    <a href="blog.html?slug=${post.slug}" class="read-more-link">קרא עוד</a>
                                </div>
                            `;
                            postsContainer.appendChild(postElement);
                        });
                    }
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

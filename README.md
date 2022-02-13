# What is this?

This is the source code for blog.jakelee.co.uk, generated using Jekyll!

# What are all the files?

* `_includes/`: All the code to be added into the site, on top of the default
    * `custom/`: Contains custom code to be included elsewhere.
        * `contact.html`: Contains the bottom left bit of the footer.
        * `read_time.html`: Contains the calculations for reading time.
        * `search.html`: Contains the site search script.
        * `tags.html`: Contains the parsing & linking for tags.
    * `footer.html`: Overrides bottom footer.
    * `head.html`: Overrides top header.
    * `social.html`: Overrides social linking in footer.
* `_layouts/`: All the templates for page types.
    * `home.html`: Template for the homepage, with pagination etc.
    * `post.html`: Template for individual post pages.
* `_posts/`: The main content of the site, all the posts in markdown format.
* `assets/`: All the non-markdown custom assets needed.
    * `images/`: Images for newer posts.
    * `js/`: Third party JS scripts.
    * `minimal-social-icons.svg`: Override of social icons, to add more.
* `wp_content/`: Migrated images from wordpress blog.
* `Gemfile`: Defines all the plugins, from GitHub Pages' small selection.
* `Gemfile.lock`: Defines all the versions / dependcies of plugins.
* `_config.yml`: Main config for the site.
* `index.html`: Default page, nothing interesting.
* `search.html`: Standalone page for the search functionality.
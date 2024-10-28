document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-container');
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const toggleCartButton = document.getElementById('toggle-cart');
    const searchIcon = document.getElementById('search-icon');
    const searchBar = document.getElementById('search-bar');
    const products = Array.from(document.querySelectorAll('.product'));
    const filterButtons = document.querySelectorAll('.filter-button');
    let selectedCategory = 'All'; // Default category
    let cart = [];

    // Function to update the cart display
    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.product}</td>
                <td>${item.quantity}</td>
                <td>₱${(item.price * item.quantity).toFixed(2)}</td>
                <td style="border-color: white;"><button class="delete-item" data-index="${index}">Delete</button></td>
            `;
            cartItems.appendChild(row);
            total += item.price * item.quantity;
        });
        totalPriceElement.textContent = `₱${total.toFixed(2)}`;
    }

    // Add event listeners to 'Add to Cart' buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.getAttribute('data-product');
            const price = parseFloat(button.getAttribute('data-price'));
            const quantity = parseInt(button.previousElementSibling.value); // Get quantity from the input field

            // Check if the item is already in the cart
            const existingItem = cart.find(item => item.product === product);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ product, quantity, price });
            }
            updateCart();
        });
    });

    // Handle cart toggle
    toggleCartButton.addEventListener('click', () => {
        cartContainer.classList.toggle('expanded');
        cartContainer.classList.toggle('collapsed');
    });

    // Ensure the cart starts in the collapsed state
    if (!cartContainer.classList.contains('expanded') && !cartContainer.classList.contains('collapsed')) {
        cartContainer.classList.add('collapsed');
    }

    // Handle clear cart
    document.getElementById('clear-cart').addEventListener('click', () => {
        cart = [];
        updateCart();
    });

    // Handle checkout (for now, just clear the cart)
    document.getElementById('checkout').addEventListener('click', () => {
        alert('Thank you for your order! :)');
        cart = [];
        updateCart();
    });

    // Function to filter products based on search input and category
    function filterProducts(query) {
        const lowerCaseQuery = query.toLowerCase();
        products.forEach(product => {
            const productName = product.querySelector('h4').textContent.toLowerCase();
            const productCategory = product.getAttribute('data-category');
            const matchesSearch = productName.includes(lowerCaseQuery);
            const matchesCategory = (selectedCategory === 'All') || (productCategory === selectedCategory);

            product.style.display = (matchesSearch && matchesCategory) ? '' : 'none';
        });
    }

    // Event listener for search bar
    searchBar.addEventListener('input', (e) => {
        filterProducts(e.target.value);
    });

    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedCategory = button.getAttribute('data-filter');

            // Remove 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add 'active' class to the clicked button
            button.classList.add('active');

            filterProducts(searchBar.value);
        });
    });

    // Handle remove item from cart
    cartItems.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-item')) {
            const index = parseInt(e.target.getAttribute('data-index'));
            cart.splice(index, 1);
            updateCart();
        }
    });

    // Toggle the search bar visibility
    searchIcon.addEventListener('click', () => {
        searchBar.classList.toggle('visible');

        if (searchBar.classList.contains('visible')) {
            searchBar.focus();  // Automatically focus the search bar
        } else {
            searchBar.value = '';  // Clear the search bar when hiding
        }
    });
});

    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const headerImage = document.querySelector('.header-image');
        
        // Adjust the scaling based on scroll position
        const scaleValue = 1 + (scrollPosition * 0.001); // Zoom-in or Zoom-out factor
        headerImage.style.transform = `scale(${scaleValue})`;
    });

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
    
        // Show loading spinner
        var spinner = document.querySelector('.loading-spinner');
        var feedback = document.querySelector('.form-feedback');
        spinner.style.display = 'block';
    
        // Simulate sending email (replace with actual AJAX call)
        setTimeout(function() {
            spinner.style.display = 'none';
            feedback.style.display = 'block';
    
            // Example of success response
            var success = true; // Set to false for testing error response
    
            if (success) {
                feedback.textContent = 'Message sent successfully!';
                feedback.classList.add('success');
                feedback.classList.remove('error');
            } else {
                feedback.textContent = 'Failed to send the message. Please try again.';
                feedback.classList.add('error');
                feedback.classList.remove('success');
            }
    
            // Clear form fields after successful submission
            if (success) {
                document.getElementById('contact-form').reset();
            }
        }, 2000); // Simulating a delay for email sending
    });



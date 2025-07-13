// مدیریت مودال ورود/ثبت نام
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const modal = document.getElementById('auth-modal');
const closeBtn = document.querySelector('.close');
const toggleAuth = document.getElementById('toggle-auth');
const modalTitle = document.getElementById('modal-title');
const submitBtn = document.getElementById('submit-btn');
const registerFields = document.getElementById('register-fields');
const authForm = document.getElementById('auth-form');

let isLogin = true;

// باز کردن مودال برای ورود
loginBtn.addEventListener('click', () => {
    isLogin = true;
    modalTitle.textContent = 'ورود به حساب کاربری';
    submitBtn.textContent = 'ورود';
    registerFields.style.display = 'none';
    toggleAuth.innerHTML = 'حساب کاربری ندارید؟ <a href="#">ثبت نام</a>';
    modal.style.display = 'block';
});

// باز کردن مودال برای ثبت نام
registerBtn.addEventListener('click', () => {
    isLogin = false;
    modalTitle.textContent = 'ثبت نام کاربر جدید';
    submitBtn.textContent = 'ثبت نام';
    registerFields.style.display = 'block';
    toggleAuth.innerHTML = 'قبلاً ثبت نام کرده‌اید؟ <a href="#">ورود</a>';
    modal.style.display = 'block';
});

// تغییر بین حالت ورود و ثبت نام
toggleAuth.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        if (isLogin) {
            // تغییر به حالت ثبت نام
            isLogin = false;
            modalTitle.textContent = 'ثبت نام کاربر جدید';
            submitBtn.textContent = 'ثبت نام';
            registerFields.style.display = 'block';
            toggleAuth.innerHTML = 'قبلاً ثبت نام کرده‌اید؟ <a href="#">ورود</a>';
        } else {
            // تغییر به حالت ورود
            isLogin = true;
            modalTitle.textContent = 'ورود به حساب کاربری';
            submitBtn.textContent = 'ورود';
            registerFields.style.display = 'none';
            toggleAuth.innerHTML = 'حساب کاربری ندارید؟ <a href="#">ثبت نام</a>';
        }
    }
});

// بستن مودال
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// ارسال فرم
authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (isLogin) {
        // لاگین کاربر
        console.log('ورود با:', email, password);
        alert('ورود با موفقیت انجام شد!');
    } else {
        // ثبت نام کاربر
        const fullname = document.getElementById('fullname').value;
        console.log('ثبت نام با:', fullname, email, password);
        alert('ثبت نام با موفقیت انجام شد!');
    }
    
    modal.style.display = 'none';
    authForm.reset();
});

// دریافت پست‌ها از بک‌اند
document.addEventListener('DOMContentLoaded', () => {
    fetchPosts();
});

async function fetchPosts() {
    try {
        const response = await fetch('http://localhost:3000/api/posts');
        const posts = await response.json();
        
        const postsContainer = document.querySelector('.blog-posts');
        
        // پاک کردن پست‌های موجود (اگر وجود داشته باشند)
        postsContainer.innerHTML = '';
        
        // ایجاد پست‌های جدید
        posts.forEach(post => {
            const postElement = document.createElement('article');
            postElement.className = 'post';
            
            postElement.innerHTML = `
                <img src="${post.image}" alt="${post.title}">
                <div class="post-content">
                    <h3>${post.title}</h3>
                    <p class="post-meta">نوشته شده توسط ${post.author} | ${post.date}</p>
                    <p>${post.excerpt}</p>
                    <a href="#" class="read-more">ادامه مطلب</a>
                </div>
            `;
            
            postsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error('خطا در دریافت پست‌ها:', error);
    }
}
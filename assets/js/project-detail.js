// 项目详情页面通用JavaScript功能
(function() {
    'use strict';

    // DOM加载完成后初始化
    document.addEventListener('DOMContentLoaded', function() {
        initProjectNavigation();
        initImageModal();
        initBackToTop();
        initScrollEffects();
    });

    // 初始化项目导航功能
    function initProjectNavigation() {
        // 导航链接点击效果
        document.querySelectorAll('.project-nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // 更新活动链接样式
                    document.querySelectorAll('.project-nav-link').forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                    
                    // 平滑滚动到目标位置
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // 初始化图片放大模态框
    function initImageModal() {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const closeBtn = document.querySelector('.modal-close');
        
        if (!modal || !modalImg || !closeBtn) return;
        
        // 为所有可放大的图片添加点击事件
        document.querySelectorAll('.zoomable-image').forEach(img => {
            img.addEventListener('click', function() {
                modal.style.display = 'block';
                modalImg.src = this.src;
                modalImg.alt = this.alt || '放大图片';
                document.body.style.overflow = 'hidden'; // 防止背景滚动
            });
        });
        
        // 点击关闭按钮关闭模态框
        closeBtn.addEventListener('click', closeModal);
        
        // 点击模态框外部关闭
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // ESC键关闭模态框
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });

        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // 恢复背景滚动
        }
    }

    // 初始化回到顶部功能
    function initBackToTop() {
        // 回到顶部按钮点击事件
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            backToTop.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // 初始化滚动效果
    function initScrollEffects() {
        // 导航栏滚动效果
        window.addEventListener('scroll', function() {
            const nav = document.querySelector('.project-nav');
            if (nav) {
                if (window.scrollY > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            }

            // 回到顶部按钮显示/隐藏
            const backToTop = document.querySelector('.back-to-top');
            if (backToTop) {
                if (window.scrollY > 500) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            }
        });
    }

    // 滚动时高亮当前导航链接
    function highlightCurrentNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.project-nav-link');
        
        if (sections.length === 0 || navLinks.length === 0) return;

        const scrollPosition = window.scrollY + 100; // 偏移量
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                currentSection = sectionId;
            }
        });

        // 更新导航链接状态
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.substring(1) === currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // 节流函数，优化滚动性能
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // 优化滚动事件，添加导航高亮
    window.addEventListener('scroll', throttle(function() {
        highlightCurrentNav();
    }, 100));

})(); 
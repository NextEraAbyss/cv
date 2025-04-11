// 项目详情页交互功能
document.addEventListener('DOMContentLoaded', () => {
    // 导航栏滚动效果
    const nav = document.querySelector('.project-nav');
    const navHeight = nav.offsetHeight;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > navHeight) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 导航链接激活状态
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.project-nav-link');

    const updateActiveLink = () => {
        const scrollPosition = window.scrollY + navHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 图片预览功能
    const createImageModal = () => {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <img src="" alt="Preview">
                <button class="modal-close">&times;</button>
            </div>
        `;
        document.body.appendChild(modal);

        const modalImg = modal.querySelector('img');
        const closeBtn = modal.querySelector('.modal-close');

        const openModal = (imgSrc) => {
            modalImg.src = imgSrc;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        };

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        return openModal;
    };

    const openImageModal = createImageModal();

    // 为所有项目图片添加点击事件
    const projectImages = document.querySelectorAll('.project-main-image, .project-screenshots img');
    projectImages.forEach(img => {
        img.addEventListener('click', () => {
            openImageModal(img.src);
        });
    });

    // 添加图片加载动画
    const addImageLoadingAnimation = () => {
        projectImages.forEach(img => {
            img.style.opacity = '0';
            img.addEventListener('load', () => {
                img.style.transition = 'opacity 0.3s ease';
                img.style.opacity = '1';
            });
        });
    };

    addImageLoadingAnimation();

    // 添加滚动动画
    const addScrollAnimation = () => {
        const elements = document.querySelectorAll('.project-main, .project-info-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(element);
        });
    };

    addScrollAnimation();

    // 技术标签悬停效果
    const techTags = document.querySelectorAll('.project-tech span');
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-2px)';
            tag.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });

        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0)';
            tag.style.boxShadow = 'none';
        });
    });

    // 响应式导航菜单
    const createMobileMenu = () => {
        const nav = document.querySelector('.project-nav');
        const container = nav.querySelector('.container');
        
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-button';
        menuButton.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.innerHTML = nav.querySelector('.project-nav-links').innerHTML;
        
        container.appendChild(menuButton);
        nav.appendChild(mobileMenu);

        menuButton.addEventListener('click', () => {
            menuButton.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // 点击菜单项后关闭菜单
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuButton.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    };

    if (window.innerWidth <= 768) {
        createMobileMenu();
    }

    // 窗口大小改变时重新初始化移动端菜单
    window.addEventListener('resize', () => {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (window.innerWidth <= 768 && !mobileMenu) {
            createMobileMenu();
        }
    });
}); 
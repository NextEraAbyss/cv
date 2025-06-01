// DOM元素
const header = document.querySelector('.project-nav') || document.getElementById('header');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.querySelector('.back-to-top');
const pageLoader = document.querySelector('.page-loader');
const typewriterElement = document.getElementById('typewriter');

// 滚动进度条
const scrollProgress = document.querySelector('.scroll-progress');

// 添加移动端优化代码
function isMobile() {
    return window.innerWidth <= 768;
}

// 移动端粒子效果降级
function optimizeForMobile() {
    if (isMobile()) {
        // 减少粒子数量以提高性能
        if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 30, // 减少粒子数量
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#00bcd4"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#00bcd4",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 3,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            });
        }
        
        // 为移动设备优化AOS动画
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 600, // 减少动画时间
                once: true,
                disable: 'phone' // 在非常小的设备上禁用
            });
        }
    }
}

// 页面加载效果
window.addEventListener('load', function() {
    // 初始化滚动进度条
    initScrollProgress();
    
    // 初始化页面切换动画
    initPageTransitions();
    
    // 初始化延迟加载图片
    initLazyLoading();
    
    // 初始化触摸交互
    initTouchInteractions();
    
    // 隐藏加载动画
    setTimeout(function() {
        pageLoader.classList.add('fade-out');
        document.body.classList.add('loaded');
        
        // 初始化动画
        initAnimations();
        
        // 初始化打字机效果
        typeWriter();
        
        // 初始化粒子效果
        initParticles();
        
        // 移动端优化
        optimizeForMobile();
        
        // 初始化AOS
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
        
        // 初始化导航高亮
        highlightNavOnScroll();
        
        // 添加滚动事件监听
        window.addEventListener('scroll', function() {
            requestAnimationFrame(highlightNavOnScroll);
        });
        
        // 添加窗口大小改变事件监听
        window.addEventListener('resize', function() {
            requestAnimationFrame(highlightNavOnScroll);
        });
    }, isMobile() ? 300 : 500); // 移动端更快的加载时间
});

// 初始化粒子效果
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#00bcd4"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#00bcd4",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 3,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
}

// 初始化元素动画
function initAnimations() {
    const heroElements = document.querySelectorAll('.fade-up, .fade-in');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('aos-animate');
        }, 200 * index);
    });
    
    // 联系我部分动画
    const contactSection = document.querySelector('.contact');
    if (contactSection) {
        const contactInfo = contactSection.querySelector('.contact-info');
        const contactItems = contactSection.querySelectorAll('.contact-item');
        const contactSocial = contactSection.querySelector('.contact-social');
        
        function animateContactSection() {
            if (isElementInViewport(contactSection)) {
                if (contactInfo) {
                    contactInfo.classList.add('fade-in');
                }
                
                // 逐个显示联系项目
                contactItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('fade-in');
                    }, 200 * (index + 1));
                });
                
                // 显示社交媒体图标
                if (contactSocial) {
                    setTimeout(() => {
                        contactSocial.classList.add('fade-in');
                    }, 200 * (contactItems.length + 1));
                }
            }
        }
        
        // 初始检查
        animateContactSection();
        
        // 滚动时检查
        window.addEventListener('scroll', animateContactSection);
    }
    
    // 技能进度条动画
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const skillBars = skillsSection.querySelectorAll('.skill-progress');
        
        function animateSkillBars() {
            if (isElementInViewport(skillsSection)) {
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                
                // 移除滚动监听器，确保动画只执行一次
                window.removeEventListener('scroll', animateSkillBars);
            }
        }
        
        // 初始检查
        window.addEventListener('load', animateSkillBars);
        
        // 滚动时检查
        window.addEventListener('scroll', animateSkillBars);
    }
}

// 检查元素是否在视口中
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// 打字机效果
function typeWriter() {
    if (!typewriterElement) return;
    
    const texts = [
        "专注前端开发兼具后端及大前端全栈能力",
        "精通前端技术栈与Golang后端开发",
        "擅长数据库设计和API开发",
        "热爱创新和技术挑战"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500; // 暂停时间
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // 切换词语间隔
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);
}

// 滚动效果
window.addEventListener('scroll', function() {
    // 导航栏滚动效果
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // 回到顶部按钮显示/隐藏
    if (backToTop) {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    // 高亮当前滚动位置对应的导航链接
    highlightNavOnScroll();

    // 滚动进度条
    if (scrollProgress) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }
});

// 移动端菜单切换
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
        
        // 切换body滚动锁定，防止菜单打开时页面可滚动
        if (navList.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            // 延迟解锁滚动，等待菜单关闭动画完成
            setTimeout(() => {
                document.body.style.overflow = '';
            }, 300);
        }
    });
}

// 点击导航链接后关闭移动菜单
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // 阻止默认行为以便可以先关闭菜单
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // 先关闭菜单
        mobileMenuToggle.classList.remove('active');
        navList.classList.remove('active');
        
        // 解锁滚动
        document.body.style.overflow = '';
        
        // 延迟滚动到目标位置，等待菜单关闭
        setTimeout(() => {
            const offsetTop = targetSection.offsetTop;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }, 400);
    });
});

// 根据滚动位置高亮导航链接
function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // 调整偏移量
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (sectionId) {
            // 判断当前滚动位置是否在section范围内
            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                currentSection = sectionId;
            }
            
            // 特殊处理：如果是最后一个section且已滚动到底部
            if (section === sections[sections.length - 1] && 
                (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
                currentSection = sectionId;
            }
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

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// 回到顶部按钮点击事件
if (backToTop) {
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 项目卡片图片加载失败处理
document.querySelectorAll('.project-placeholder').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'https://via.placeholder.com/600x400?text=项目图片';
    });
});

// 滚动进度条功能
function initScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (!scrollProgress) return; // 如果元素不存在，直接返回
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        scrollProgress.style.width = scrollPercent + '%';
    });
}

// 页面切换动画
function initPageTransitions() {
    // 内部导航链接平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // 关闭移动菜单（如果打开）
            if (isMobile() && document.body.classList.contains('menu-open')) {
                document.body.classList.remove('menu-open');
                document.querySelector('.mobile-menu-toggle').classList.remove('active');
            }
            
            // 平滑滚动到目标位置
            window.scrollTo({
                top: targetElement.offsetTop - 70, // 导航栏高度补偿
                behavior: 'smooth'
            });
        });
    });
}

// 延迟加载图片
function initLazyLoading() {
    // 使用IntersectionObserver进行延迟加载
    if ('IntersectionObserver' in window) {
        let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    
                    // 图片加载后添加loaded类
                    lazyImage.onload = function() {
                        this.classList.add('loaded');
                        // 确保移除lazy类
                        this.classList.remove('lazy');
                    };
                    
                    // 开始加载图片
                    if (lazyImage.dataset.src) {
                        lazyImage.src = lazyImage.dataset.src;
                    }
                    
                    if (lazyImage.dataset.srcset) {
                        lazyImage.srcset = lazyImage.dataset.srcset;
                    }
                    
                    // 如果图片已经在缓存中，可能不会触发onload事件
                    if (lazyImage.complete) {
                        lazyImage.classList.add('loaded');
                        lazyImage.classList.remove('lazy');
                    }
                    
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        }, {
            rootMargin: "0px 0px 200px 0px" // 提前200px加载
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // 兼容性方案
        let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
        let active = false;

        const lazyLoad = function() {
            if (active === false) {
                active = true;

                setTimeout(function() {
                    lazyImages.forEach(function(lazyImage) {
                        if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
                            // 图片加载后添加loaded类
                            lazyImage.onload = function() {
                                this.classList.add('loaded');
                                this.classList.remove('lazy');
                            };
                            
                            // 开始加载图片
                            if (lazyImage.dataset.src) {
                                lazyImage.src = lazyImage.dataset.src;
                            }
                            
                            if (lazyImage.dataset.srcset) {
                                lazyImage.srcset = lazyImage.dataset.srcset;
                            }
                            
                            // 如果图片已经在缓存中
                            if (lazyImage.complete) {
                                lazyImage.classList.add('loaded');
                                lazyImage.classList.remove('lazy');
                            }

                            lazyImages = lazyImages.filter(function(image) {
                                return image !== lazyImage;
                            });

                            if (lazyImages.length === 0) {
                                document.removeEventListener("scroll", lazyLoad);
                                window.removeEventListener("resize", lazyLoad);
                                window.removeEventListener("orientationchange", lazyLoad);
                            }
                        }
                    });

                    active = false;
                }, 200);
            }
        };

        document.addEventListener("scroll", lazyLoad);
        window.addEventListener("resize", lazyLoad);
        window.addEventListener("orientationchange", lazyLoad);
        
        // 初始触发一次
        setTimeout(lazyLoad, 0);
    }
}

// 为移动设备优化触摸交互
function initTouchInteractions() {
    if (isMobile()) {
        // 查找有hover效果的元素
        const touchElements = document.querySelectorAll('.project-card, .skill-category, .contact-item, .timeline-item');
        
        // 添加触摸反馈
        touchElements.forEach(el => {
            el.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            }, { passive: true });
            
            el.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            }, { passive: true });
            
            el.addEventListener('touchcancel', function() {
                this.classList.remove('touch-active');
            }, { passive: true });
        });
        
        // 优化滚动性能
        document.body.classList.add('mobile-optimized');
        
        // 添加快速点击库以消除点击延迟
        if (typeof FastClick === 'function') {
            FastClick.attach(document.body);
        }
    }
}
// 性能优化工具函数
const performance_utils = {
    // 防抖函数 - 优化滚动和resize事件
    debounce: function(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },

    // 节流函数 - 优化高频事件
    throttle: function(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // 请求动画帧节流
    rafThrottle: function(func) {
        let rafId = null;
        return function(...args) {
            if (rafId === null) {
                rafId = requestAnimationFrame(() => {
                    func.apply(this, args);
                    rafId = null;
                });
            }
        };
    },

    // 检测元素是否在视口内 - 优化版本
    isInViewport: function(element, threshold = 0) {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        
        return (
            rect.top >= -threshold &&
            rect.left >= -threshold &&
            rect.bottom <= windowHeight + threshold &&
            rect.right <= windowWidth + threshold
        );
    },

    // 预加载关键资源
    preloadCriticalResources: function() {
        const criticalImages = [
            'assets/images/projects/flutter-job-home.jpg',
            'assets/images/projects/uni-job-h5.jpg',
            'assets/images/wechat-qrcode.png'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
};

// DOM元素 - 使用更高效的选择器
const elements = {
    header: document.querySelector('.project-nav') || document.getElementById('header'),
    mobileMenuToggle: document.querySelector('.mobile-menu-toggle'),
    navList: document.querySelector('.nav-list'),
    navLinks: document.querySelectorAll('.nav-link'),
    backToTop: document.querySelector('.back-to-top'),
    pageLoader: document.querySelector('.page-loader'),
    typewriterElement: document.getElementById('typewriter'),
    scrollProgress: document.querySelector('.scroll-progress'),
    particlesContainer: document.getElementById('particles-js')
};

// 设备检测优化
const device = {
    isMobile: () => window.innerWidth <= 768,
    isTouch: () => 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    isLowEndDevice: () => {
        // 检测低端设备
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const slowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
        const lowMemory = navigator.deviceMemory && navigator.deviceMemory < 4;
        const lowCPU = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
        
        return slowConnection || lowMemory || lowCPU;
    },
    
    // 获取设备性能等级
    getPerformanceLevel: function() {
        if (this.isLowEndDevice()) return 'low';
        if (this.isMobile()) return 'medium';
        return 'high';
    }
};

// 性能配置
const performanceConfig = {
    low: {
        particleCount: 15,
        animationDuration: 400,
        enableComplexAnimations: false,
        lazyLoadOffset: 50
    },
    medium: {
        particleCount: 30,
        animationDuration: 600,
        enableComplexAnimations: true,
        lazyLoadOffset: 100
    },
    high: {
        particleCount: 80,
        animationDuration: 800,
        enableComplexAnimations: true,
        lazyLoadOffset: 200
    }
};

// 获取当前性能配置
const currentConfig = performanceConfig[device.getPerformanceLevel()];

// 优化后的移动端适配
function optimizeForDevice() {
    const performanceLevel = device.getPerformanceLevel();
    const config = performanceConfig[performanceLevel];
    
    // 根据设备性能调整粒子效果
    if (elements.particlesContainer && typeof particlesJS !== 'undefined') {
        const particleConfig = getParticleConfig(config.particleCount);
        particlesJS('particles-js', particleConfig);
    }
    
    // 根据设备性能初始化AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: config.animationDuration,
            once: true,
            disable: performanceLevel === 'low' ? 'phone' : false,
            offset: config.lazyLoadOffset
        });
    }
    
    // 为低端设备禁用复杂动画
    if (!config.enableComplexAnimations) {
        document.body.classList.add('reduce-motion');
    }
}

// 粒子配置工厂函数
function getParticleConfig(particleCount) {
    return {
        "particles": {
            "number": {
                "value": particleCount,
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
                "speed": device.getPerformanceLevel() === 'low' ? 1 : 3,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": device.getPerformanceLevel() !== 'low',
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
                "push": {
                    "particles_nb": device.getPerformanceLevel() === 'low' ? 2 : 4
                }
            }
        },
        "retina_detect": true
    };
}

// 页面加载性能监控
const performanceMonitor = {
    // 监控页面加载性能
    monitorPageLoad: function() {
        window.addEventListener('load', () => {
            // 使用Performance API监控关键指标
            if ('performance' in window) {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    const paintData = performance.getEntriesByType('paint');
                    
                    const metrics = {
                        // DOM加载时间
                        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                        // 页面完全加载时间
                        pageLoadTime: perfData.loadEventEnd - perfData.navigationStart,
                        // 首次内容绘制
                        fcp: paintData.find(p => p.name === 'first-contentful-paint')?.startTime,
                        // 最大内容绘制
                        lcp: this.measureLCP(),
                        // 累积布局偏移
                        cls: this.measureCLS(),
                        // 首次输入延迟
                        fid: this.measureFID()
                    };
                    
                    // 发送性能数据到分析服务
                    this.sendPerformanceData(metrics);
                }, 0);
            }
        });
    },
    
    // 测量最大内容绘制
    measureLCP: function() {
        return new Promise((resolve) => {
            new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];
                resolve(lastEntry.startTime);
            }).observe({entryTypes: ['largest-contentful-paint']});
        });
    },
    
    // 测量累积布局偏移
    measureCLS: function() {
        return new Promise((resolve) => {
            let clsValue = 0;
            new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                }
                resolve(clsValue);
            }).observe({entryTypes: ['layout-shift']});
        });
    },
    
    // 测量首次输入延迟
    measureFID: function() {
        return new Promise((resolve) => {
            new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    resolve(entry.processingStart - entry.startTime);
                }
            }).observe({entryTypes: ['first-input']});
        });
    },
    
    // 发送性能数据
    sendPerformanceData: function(metrics) {
        // 发送到Google Analytics或其他分析服务
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_performance', {
                'custom_map': {
                    'metric1': 'page_load_time',
                    'metric2': 'dom_content_loaded',
                    'metric3': 'first_contentful_paint'
                },
                'metric1': Math.round(metrics.pageLoadTime),
                'metric2': Math.round(metrics.domContentLoaded),
                'metric3': Math.round(metrics.fcp || 0)
            });
        }
        
        // 控制台输出调试信息
        console.log('性能指标:', metrics);
    }
};

// 用户体验增强功能
const userExperienceEnhancer = {
    // 初始化所有UX增强功能
    init: function() {
        this.initThemeToggle();
        this.initSkillAccordion();
        this.initNotifications();
        this.initKeyboardNavigation();
        this.initIntersectionObserver();
    },
    
    // 深色模式切换
    initThemeToggle: function() {
        // 创建主题切换按钮
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.setAttribute('aria-label', '切换深色模式');
        document.body.appendChild(themeToggle);
        
        // 检查用户偏好
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        let currentTheme = localStorage.getItem('theme') || (prefersDark.matches ? 'dark' : 'light');
        
        this.applyTheme(currentTheme);
        
        themeToggle.addEventListener('click', () => {
            currentTheme = currentTheme === 'light' ? 'dark' : 'light';
            this.applyTheme(currentTheme);
            localStorage.setItem('theme', currentTheme);
        });
        
        // 监听系统主题变化
        prefersDark.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    },
    
    // 应用主题
    applyTheme: function(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.innerHTML = theme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        }
    },
    
    // 移动端技能手风琴
    initSkillAccordion: function() {
        if (device.isMobile()) {
            const skillCategories = document.querySelectorAll('.skill-category');
            
            skillCategories.forEach((category, index) => {
                category.classList.add(index === 0 ? 'expanded' : 'collapsed');
                
                const header = category.querySelector('h3');
                header.addEventListener('click', () => {
                    const isExpanded = category.classList.contains('expanded');
                    
                    // 关闭其他展开的分类
                    skillCategories.forEach(cat => {
                        cat.classList.remove('expanded');
                        cat.classList.add('collapsed');
                    });
                    
                    // 切换当前分类
                    if (!isExpanded) {
                        category.classList.remove('collapsed');
                        category.classList.add('expanded');
                    }
                });
            });
        }
    },
    
    // 通知系统
    initNotifications: function() {
        this.showNotification = function(message, type = 'info', duration = 3000) {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.innerHTML = `
                <div class="notification-content">
                    <span>${message}</span>
                    <button class="notification-close" aria-label="关闭通知">&times;</button>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            // 显示通知
            setTimeout(() => notification.classList.add('show'), 100);
            
            // 自动隐藏
            const hideTimeout = setTimeout(() => {
                this.hideNotification(notification);
            }, duration);
            
            // 手动关闭
            notification.querySelector('.notification-close').addEventListener('click', () => {
                clearTimeout(hideTimeout);
                this.hideNotification(notification);
            });
        };
        
        this.hideNotification = function(notification) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        };
    },
    
    // 键盘导航优化
    initKeyboardNavigation: function() {
        // 添加跳转链接
        const skipLink = document.createElement('a');
        skipLink.className = 'skip-link';
        skipLink.href = '#main-content';
        skipLink.textContent = '跳转到主要内容';
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // 添加main内容标识
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.id = 'main-content';
        }
        
        // Tab键导航优化
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    },
    
    // 交叉观察器优化
    initIntersectionObserver: function() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    
                    // 技能条动画
                    if (entry.target.classList.contains('skill-category')) {
                        const skillBars = entry.target.querySelectorAll('.skill-progress');
                        skillBars.forEach(bar => {
                            bar.style.width = bar.dataset.width || bar.style.width;
                        });
                    }
                }
            });
        }, observerOptions);
        
        // 观察所有动画元素
        const animatedElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item');
        animatedElements.forEach(el => observer.observe(el));
    }
};

// 错误处理和降级方案
const errorHandler = {
    init: function() {
        // 全局错误处理
        window.addEventListener('error', (e) => {
            this.logError('JavaScript Error', e.error);
        });
        
        // Promise错误处理
        window.addEventListener('unhandledrejection', (e) => {
            this.logError('Promise Rejection', e.reason);
        });
        
        // 资源加载错误处理
        window.addEventListener('error', (e) => {
            if (e.target !== window) {
                this.handleResourceError(e.target);
            }
        }, true);
    },
    
    logError: function(type, error) {
        console.error(`${type}:`, error);
        
        // 发送错误日志到分析服务
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                'description': `${type}: ${error.message || error}`,
                'fatal': false
            });
        }
    },
    
    handleResourceError: function(element) {
        if (element.tagName === 'IMG') {
            // 图片加载失败降级
            element.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225"%3E%3Crect width="400" height="225" fill="%23f0f0f0"/%3E%3Ctext x="50%" y="50%" font-family="Arial" font-size="14" fill="%23999" text-anchor="middle" dy=".3em"%3E图片加载失败%3C/text%3E%3C/svg%3E';
            element.alt = '图片加载失败';
        }
    }
};

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
        elements.pageLoader.classList.add('fade-out');
        document.body.classList.add('loaded');
        
        // 初始化动画
        initAnimations();
        
        // 初始化打字机效果
        typeWriter();
        
        // 初始化粒子效果
        initParticles();
        
        // 移动端优化
        optimizeForDevice();
        
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
    }, device.isMobile() ? 300 : 500); // 移动端更快的加载时间
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
            if (performance_utils.isInViewport(contactSection)) {
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
            if (performance_utils.isInViewport(skillsSection)) {
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
    if (!elements.typewriterElement) return;
    
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
            elements.typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            elements.typewriterElement.textContent = currentText.substring(0, charIndex + 1);
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
    if (elements.header) {
        if (window.scrollY > 50) {
            elements.header.classList.add('scrolled');
        } else {
            elements.header.classList.remove('scrolled');
        }
    }

    // 回到顶部按钮显示/隐藏
    if (elements.backToTop) {
        if (window.scrollY > 500) {
            elements.backToTop.classList.add('visible');
        } else {
            elements.backToTop.classList.remove('visible');
        }
    }

    // 高亮当前滚动位置对应的导航链接
    highlightNavOnScroll();

    // 滚动进度条
    if (elements.scrollProgress) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        elements.scrollProgress.style.width = scrollPercent + '%';
    }
});

// 移动端菜单切换
if (elements.mobileMenuToggle) {
    elements.mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        elements.navList.classList.toggle('active');
        
        // 切换body滚动锁定，防止菜单打开时页面可滚动
        if (elements.navList.classList.contains('active')) {
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
elements.navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // 阻止默认行为以便可以先关闭菜单
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // 先关闭菜单
        elements.mobileMenuToggle.classList.remove('active');
        elements.navList.classList.remove('active');
        
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
    elements.navLinks.forEach(link => {
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
            if (device.isMobile() && document.body.classList.contains('menu-open')) {
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
    if (device.isMobile()) {
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
// Sample data for the app
const sampleData = {
    currentChallenge: {
        title: "The Two-Minute Rule",
        description: "If a task takes less than two minutes, do it immediately. This hack helps overcome procrastination by creating momentum.",
        category: "Productivity",
        duration: "7 days",
        accepted: false
    },
    upcomingChallenges: [
        {
            title: "5-4-3-2-1 Countdown",
            description: "When you're feeling unmotivated, count down from 5 and take action at 1. This interrupts hesitation and creates immediate action.",
            category: "Motivation",
            duration: "7 days"
        },
        {
            title: "Digital Detox Hour",
            description: "Set aside one hour each day without digital devices. Use this time for reflection, reading, or connecting with others face-to-face.",
            category: "Wellness",
            duration: "7 days"
        },
        {
            title: "One-Touch Rule",
            description: "Handle each piece of paper or email only once. Decide immediately what to do with it: act, file, or discard.",
            category: "Organization",
            duration: "7 days"
        }
    ],
    progress: {
        streak: 5,
        completed: 12,
        points: 450
    },
    badges: [
        { name: "Starter", icon: "fas fa-seedling" },
        { name: "Week Warrior", icon: "fas fa-medal" },
        { name: "Habit Hero", icon: "fas fa-trophy" },
        { name: "Reflector", icon: "fas fa-lightbulb" }
    ],
    reflections: [
        {
            title: "Morning Pages Challenge",
            content: "Writing three pages every morning was tough at first but became a great way to clear my mind. I noticed I'm more focused throughout the day.",
            date: "2023-05-15"
        },
        {
            title: "Gratitude Journaling",
            content: "Listing three things I'm grateful for each day really improved my mood. I'm more aware of positive things in my life now.",
            date: "2023-05-08"
        }
    ],
    discussions: [
        {
            title: "Struggling with the Two-Minute Rule",
            author: "Jane D.",
            content: "I keep forgetting to apply the rule. Any tips for remembering?",
            date: "2023-05-20",
            comments: 5
        },
        {
            title: "Digital Detox Success!",
            author: "Mike T.",
            content: "I've been doing the digital detox for 3 days now and already feel less stressed. Highly recommend!",
            date: "2023-05-18",
            comments: 12
        }
    ],
    leaderboard: [
        { rank: 1, user: "Alex K.", points: 1200, streak: 42 },
        { rank: 2, user: "Sarah M.", points: 980, streak: 35 },
        { rank: 3, user: "Jamie L.", points: 875, streak: 28 },
        { rank: 4, user: "Taylor R.", points: 760, streak: 21 },
        { rank: 5, user: "Jordan P.", points: 650, streak: 18 }
    ],
    recommendations: [
        {
            title: "Pomodoro Technique",
            description: "Work in focused 25-minute intervals with 5-minute breaks. This can boost productivity by managing energy and attention.",
            category: "Productivity"
        },
        {
            title: "Evening Wind-Down Routine",
            description: "Create a consistent pre-sleep routine to improve sleep quality and make mornings easier.",
            category: "Wellness"
        },
        {
            title: "One-In-One-Out Rule",
            description: "For every new item you bring into your space, remove one. Helps maintain organization and reduce clutter.",
            category: "Organization"
        }
    ]
};

// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeButtons = document.querySelectorAll('.close');
const acceptChallengeBtn = document.getElementById('acceptChallengeBtn');
const submitReflectionBtn = document.getElementById('submitReflectionBtn');
const submitPostBtn = document.getElementById('submitPostBtn');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadCurrentChallenge();
    loadUpcomingChallenges();
    loadProgressStats();
    loadBadges();
    loadReflections();
    loadDiscussions();
    loadLeaderboard();
    loadRecommendations();
    
    // Event listeners for modals
    loginBtn.addEventListener('click', () => loginModal.style.display = 'block');
    signupBtn.addEventListener('click', () => signupModal.style.display = 'block');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
    
    // Challenge acceptance
    acceptChallengeBtn.addEventListener('click', function() {
        if (!sampleData.currentChallenge.accepted) {
            sampleData.currentChallenge.accepted = true;
            this.textContent = 'Challenge Accepted!';
            this.style.backgroundColor = '#6c757d';
            sampleData.progress.streak += 1;
            sampleData.progress.points += 50;
            loadProgressStats();
        }
    });
    
    // Reflection submission
    submitReflectionBtn.addEventListener('click', function() {
        const reflectionText = document.getElementById('reflectionText').value;
        if (reflectionText.trim() !== '') {
            const newReflection = {
                title: sampleData.currentChallenge.title,
                content: reflectionText,
                date: new Date().toISOString().split('T')[0]
            };
            sampleData.reflections.unshift(newReflection);
            document.getElementById('reflectionText').value = '';
            sampleData.progress.points += 30;
            loadProgressStats();
            loadReflections();
            
            // Show success message
            alert('Reflection submitted successfully! You earned 30 points.');
        }
    });
    
    // Post submission
    submitPostBtn.addEventListener('click', function() {
        const postTitle = document.getElementById('postTitle').value;
        const postContent = document.getElementById('postContent').value;
        
        if (postTitle.trim() !== '' && postContent.trim() !== '') {
            const newPost = {
                title: postTitle,
                author: "You",
                content: postContent,
                date: new Date().toISOString().split('T')[0],
                comments: 0
            };
            sampleData.discussions.unshift(newPost);
            document.getElementById('postTitle').value = '';
            document.getElementById('postContent').value = '';
            sampleData.progress.points += 20;
            loadProgressStats();
            loadDiscussions();
            
            // Show success message
            alert('Post submitted successfully! You earned 20 points.');
        }
    });
});

// Load current challenge
function loadCurrentChallenge() {
    const challenge = sampleData.currentChallenge;
    document.getElementById('currentChallengeTitle').textContent = challenge.title;
    document.getElementById('currentChallengeDesc').textContent = challenge.description;
    
    if (challenge.accepted) {
        acceptChallengeBtn.textContent = 'Challenge Accepted!';
        acceptChallengeBtn.style.backgroundColor = '#6c757d';
    }
}

// Load upcoming challenges
function loadUpcomingChallenges() {
    const container = document.getElementById('upcomingChallenges');
    container.innerHTML = '';
    
    sampleData.upcomingChallenges.forEach(challenge => {
        const challengeEl = document.createElement('div');
        challengeEl.className = 'challenge-item';
        challengeEl.innerHTML = `
            <h4>${challenge.title}</h4>
            <p>${challenge.description}</p>
            <div class="challenge-meta">
                <span class="category">${challenge.category}</span>
                <span class="duration">${challenge.duration}</span>
            </div>
        `;
        container.appendChild(challengeEl);
    });
}

// Load progress stats
function loadProgressStats() {
    const progress = sampleData.progress;
    document.querySelector('.streak-count').innerHTML = `${progress.streak} <span>days</span>`;
    document.querySelector('.completed-count').innerHTML = `${progress.completed} <span>hacks</span>`;
    document.querySelector('.points-count').innerHTML = `${progress.points} <span>pts</span>`;
}

// Load badges
function loadBadges() {
    const container = document.getElementById('badgeContainer');
    container.innerHTML = '';
    
    sampleData.badges.forEach(badge => {
        const badgeEl = document.createElement('div');
        badgeEl.className = 'badge-item';
        badgeEl.innerHTML = `
            <i class="${badge.icon}"></i>
            <p>${badge.name}</p>
        `;
        container.appendChild(badgeEl);
    });
}

// Load reflections
function loadReflections() {
    const container = document.getElementById('previousReflections');
    container.innerHTML = '';
    
    sampleData.reflections.forEach(reflection => {
        const reflectionEl = document.createElement('div');
        reflectionEl.className = 'reflection-item';
        reflectionEl.innerHTML = `
            <h4>${reflection.title}</h4>
            <p>${reflection.content}</p>
            <div class="date">${reflection.date}</div>
        `;
        container.appendChild(reflectionEl);
    });
}

// Load discussions
function loadDiscussions() {
    const container = document.getElementById('discussionList');
    container.innerHTML = '';
    
    sampleData.discussions.forEach(discussion => {
        const discussionEl = document.createElement('div');
        discussionEl.className = 'discussion-item';
        discussionEl.innerHTML = `
            <h4>${discussion.title}</h4>
            <p>${discussion.content}</p>
            <div class="meta">
                <span>By ${discussion.author}</span>
                <span>${discussion.date}</span>
            </div>
        `;
        container.appendChild(discussionEl);
    });
}

// Load leaderboard
function loadLeaderboard() {
    const container = document.getElementById('leaderboardBody');
    container.innerHTML = '';
    
    sampleData.leaderboard.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.rank}</td>
            <td>${user.user}</td>
            <td>${user.points}</td>
            <td>${user.streak}</td>
        `;
        container.appendChild(row);
    });
}

// Load recommendations
function loadRecommendations() {
    const container = document.getElementById('recommendationList');
    container.innerHTML = '';
    
    sampleData.recommendations.forEach(rec => {
        const recEl = document.createElement('div');
        recEl.className = 'recommendation-item';
        recEl.innerHTML = `
            <h3>${rec.title}</h3>
            <p>${rec.description}</p>
            <div class="challenge-meta">
                <span class="category">${rec.category}</span>
            </div>
            <button class="btn">Learn More</button>
        `;
        container.appendChild(recEl);
    });
}

// Form submissions
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Login functionality would be implemented here in a real app.');
    loginModal.style.display = 'none';
});

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Signup functionality would be implemented here in a real app.');
    signupModal.style.display = 'none';
});
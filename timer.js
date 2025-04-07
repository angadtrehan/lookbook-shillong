export class Countdown {
    constructor({doc = document, targetDate}) {
        this.doc = doc;
        this.targetDate = targetDate;

        this.timer = this.doc.createElement('div');
        this.refs = {
            days: {
                parent: document.createElement('div'),
                text: document.createElement('h1'),
                desc: document.createElement('p')
            },
            hours: {
                parent: document.createElement('div'),
                text: document.createElement('h1'),
                desc: document.createElement('p')
            },
            minutes: {
                parent: document.createElement('div'),
                text: document.createElement('h1'),
                desc: document.createElement('p')
            },
            seconds: {
                parent: document.createElement('div'),
                text: document.createElement('h1'),
                desc: document.createElement('p')
            }
        };

        
        for (const ref in this.refs) {
            this.refs[ref].parent.classList.add('timer-child');
            switch(ref) {
                case 'days':
                    this.refs[ref].desc.textContent = 'dd';
                    break;
                case 'hours':
                    this.refs[ref].desc.textContent = 'hh';
                    break;
                case 'minutes':
                    this.refs[ref].desc.textContent = 'mm';
                    break;
                case 'seconds':
                    this.refs[ref].desc.textContent = 'ss';
                    break;

            }
            this.refs[ref].parent.appendChild(this.refs[ref].text);
            this.refs[ref].parent.appendChild(this.refs[ref].desc);
            this.timer.appendChild(this.refs[ref].parent);
        }

        this.timer.classList.add('timer');
        this.startTimer();
    }

    getRemainingTime(endTime) {
        const total = Date.parse(endTime) - Date.parse(new Date());
        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((total / 1000 / 60) % 60);
        const secs = Math.floor((total / 1000) % 60);
        return {
            total,
            days,
            hours,
            mins,
            secs,
        };
    }

    updateTimer({ days, hours, mins, secs }) {
        this.refs.days.text.innerText = String(days).padStart(2, '0');
        this.refs.hours.text.textContent = String(hours).padStart(2, '0');
        this.refs.minutes.text.textContent = String(mins).padStart(2, '0');
        this.refs.seconds.text.textContent = String(secs).padStart(2, '0');
    }

    startTimer() {
        const timer = this.getRemainingTime(this.targetDate);
        this.updateTimer(timer);
        setInterval(() => {
            const timer = this.getRemainingTime(this.targetDate);
            this.updateTimer(timer);
        }, 1000);
    }

    getTimerObject() {
        return this.timer;
    }
}
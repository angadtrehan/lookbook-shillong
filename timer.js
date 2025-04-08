export class Countdown {
    constructor({doc = document, targetDate}) {
        this.doc = doc;
        this.targetDate = targetDate;

        this.timer = this.doc.createElement('div');
        this.refs = {
            days: {
                parent: document.createElement('div'),
                subParent: document.createElement('div'),
                timerLeft: document.createElement('div'),
                timerRight: document.createElement('div'),
                textLeft: document.createElement('h1'),
                textRight: document.createElement('h1'),
                desc: document.createElement('p')
            },
            hours: {
                parent: document.createElement('div'),
                subParent: document.createElement('div'),
                timerLeft: document.createElement('div'),
                timerRight: document.createElement('div'),
                textLeft: document.createElement('h1'),
                textRight: document.createElement('h1'),
                desc: document.createElement('p')
            },
            minutes: {
                parent: document.createElement('div'),
                subParent: document.createElement('div'),
                timerLeft: document.createElement('div'),
                timerRight: document.createElement('div'),
                textLeft: document.createElement('h1'),
                textRight: document.createElement('h1'),
                desc: document.createElement('p')
            },
            seconds: {
                parent: document.createElement('div'),
                subParent: document.createElement('div'),
                timerLeft: document.createElement('div'),
                timerRight: document.createElement('div'),
                textLeft: document.createElement('h1'),
                textRight: document.createElement('h1'),
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
            this.refs[ref].timerLeft.appendChild(this.refs[ref].textLeft);
            this.refs[ref].timerRight.appendChild(this.refs[ref].textRight);
            this.refs[ref].subParent.appendChild(this.refs[ref].timerLeft);
            this.refs[ref].subParent.appendChild(this.refs[ref].timerRight);
            this.refs[ref].parent.appendChild(this.refs[ref].subParent);
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
        this.refs.days.textLeft.innerText = String(days).padStart(2, '0').at(0);
        this.refs.days.textRight.innerText = String(days).padStart(2, '0').at(1);
        this.refs.hours.textLeft.innerText = String(hours).padStart(2, '0').at(0);
        this.refs.hours.textRight.innerText = String(hours).padStart(2, '0').at(1);
        this.refs.minutes.textLeft.innerText = String(mins).padStart(2, '0').at(0);
        this.refs.minutes.textRight.innerText = String(mins).padStart(2, '0').at(1);
        this.refs.seconds.textLeft.innerText = String(secs).padStart(2, '0').at(0);
        this.refs.seconds.textRight.innerText = String(secs).padStart(2, '0').at(1);
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
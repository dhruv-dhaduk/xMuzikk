function convertDurationFormat(duration) {
    if (!duration) {
        return '00:00';
    }

    let hours;
    let minutes;
    let seconds;

    if (typeof(duration) === 'number') {
        if (isNaN(duration)) {
            return '00:00';
        }
        hours = Math.floor(duration / 3600);
        duration -= 3600 * hours;

        minutes = Math.floor(duration / 60);
        duration -= 60 * minutes;

        seconds = parseInt(duration);
    }
    else {
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        if (!match) {
            return '00:00';
        }
        hours = (parseInt(match[1]) || 0);
        minutes = (parseInt(match[2]) || 0);
        seconds = (parseInt(match[3]) || 0);
    }

    if (hours == 0)
        return `${minutes.toString()}:${seconds.toString().padStart(2, '0')}`;
    else
        return `${hours.toString()}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function getDurationFromISO(duration) {
    if (!duration)
        return 0;
    
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) {
        return 0;
    }
    const hours = (parseInt(match[1]) || 0);
    const minutes = (parseInt(match[2]) || 0);
    const seconds = (parseInt(match[3]) || 0);

    return hours * 3600 + minutes * 60 + seconds;
}

function convertUploadTimeFormat(uploadTime)
{   
    if (uploadTime == undefined)
        return "N/A";

    const d = new Date(uploadTime);
    const timeDiff = (Date.now() - d) / 1000;
    
    if (timeDiff >= 31536000)
        return time_relative_to(timeDiff, 31536000, "year");
    else if (timeDiff >= 2592000)
        return time_relative_to(timeDiff, 2592000, "month");
    else if (timeDiff >= 604800)
        return time_relative_to(timeDiff, 604800, "week");
    else if (timeDiff >= 86400)
        return time_relative_to(timeDiff, 86400, "day");
    else if (timeDiff >= 3600)
        return time_relative_to(timeDiff, 3600, "hour");
    else if (timeDiff > 60)
        return time_relative_to(timeDiff, 60, "minute");
    else
        return "just now";
}

function time_relative_to(timediff, unitTime, label)
{
    const x = parseInt(timediff / unitTime);

    if (x > 1)
        return x + " " + label + "s ago";
    else
        return x + " " + label + " ago";
}

function convertIdFromYtLink(link) {
    try {
        const url = new URL(link);

        if (url.host === 'youtu.be') {
            return url.pathname.split('/')[1];
        }
        else if (url.host === 'www.youtube.com' || url.host === 'm.youtube.com') {
            if (url.pathname === '/watch') {
                return url.searchParams.get('v');
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }

    } catch (err) {
        return null;
    }
}

export { convertDurationFormat, convertUploadTimeFormat, getDurationFromISO, convertIdFromYtLink };
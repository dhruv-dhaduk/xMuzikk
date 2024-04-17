function convertDurationFormat(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = (parseInt(match[1]) || 0);
    const minutes = (parseInt(match[2]) || 0);
    const seconds = (parseInt(match[3]) || 0);

    if (hours == 0)
        return `${minutes.toString()}:${seconds.toString().padStart(2, '0')}`;
    else
        return `${hours.toString()}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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

export { convertDurationFormat, convertUploadTimeFormat };
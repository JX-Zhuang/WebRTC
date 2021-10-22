const getDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const audioinput = document.getElementById('audioinput');
    const videoinput = document.getElementById('videoinput');
    const audiooutput = document.getElementById('audiooutput');
    const kindMapSelect = {
        audioinput,
        videoinput,
        audiooutput
    }
    devices.forEach(function (device) {
        const option = document.createElement('option');
        const element = kindMapSelect[device.kind];
        element.appendChild(option);
        option.text = device.label;
        option.value = device.deviceId;
        console.log(device.kind + ": " + device.label +
            " id = " + device.deviceId + " groundId = " + device.groupId);
    });
}
const divConstraints = document.getElementById('constraints');
const getUserMedia = async (constraints, element) => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const videoTrack = stream.getVideoTracks()[0];
        const videoConstraints = videoTrack.getSettings();
        divConstraints.textContent = JSON.stringify(videoConstraints,null,2);
        element.srcObject = stream;
    } catch (e) {
        console.log(e)
    }
}
const init = () => {
    const picture = document.getElementById('picture');
    const snapshot = document.getElementById('snapshot');
    // const element = document.getElementById('audioplayer');
    const element = document.getElementById('video');
    const width = element.offsetWidth,
        height = element.offsetHeight;
    // getUserMedia({
    //     audio: true,
    //     video:false
    // }, element);
    getUserMedia({
        // audio: true,
        video: {
            width,
            height,
            frameRate:15,
            facingMode:'enviroment'
        }
    }, element);
    getDevices();
    picture.width = width;
    picture.height = height;
    snapshot.onclick = function () {
        picture.getContext('2d').drawImage(element, 0, 0, width, height);
    }
}
init();
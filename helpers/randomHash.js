const randomHash = () => {
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let random = 0;
    for (let i = 0; i < 9; i++) {
        random += possible.charAt(Math.round(Math.random() * possible.length));
    }
    return random;
}

module.exports = {
    randomHash
};
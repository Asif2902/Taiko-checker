document.getElementById('checkAddressesBtn').addEventListener('click', async () => {
    const addresses = document.getElementById('addressInput').value.split('\n').map(addr => addr.trim()).filter(Boolean);
    const results = await Promise.all(addresses.map(async address => {
        try {
            const response = await fetch(`https://trailblazer.hekla.taiko.xyz/api/address?address=${address}`);
            const data = await response.json();
            return `${maskAddress(address)} eligible for ${data.value} token`;
        } catch (error) {
            return `Error checking address ${maskAddress(address)}`;
        }
    }));
    document.getElementById('addressResults').innerText = results.join('\n');
});

document.getElementById('checkGithubBtn').addEventListener('click', async () => {
    const githubIds = document.getElementById('githubInput').value.split('\n').map(id => id.trim()).filter(Boolean).slice(0, 50);
    const results = await Promise.all(githubIds.map(async githubId => {
        try {
            const response = await fetch(`https://trailblazer.hekla.taiko.xyz/api/github?id=${githubId}`);
            const data = await response.json();
            return `GitHub ID ${githubId} has allocation value of ${data.value}`;
        } catch (error) {
            return `Error checking GitHub ID ${githubId}`;
        }
    }));
    document.getElementById('githubResults').innerText = results.join('\n');
});

document.getElementById('checkGithubUsernameBtn').addEventListener('click', async () => {
    const githubUsernames = document.getElementById('githubUsernameInput').value.split('\n').map(id => id.trim()).filter(Boolean).slice(0, 50);
    const results = await Promise.all(githubUsernames.map(async username => {
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            const data = await response.json();
            return `GitHub username ${username} has ID ${data.id}`;
        } catch (error) {
            return `Error checking GitHub username ${username}`;
        }
    }));
    document.getElementById('githubUsernameResults').innerText = results.join('\n');
});

function maskAddress(address) {
    return address.slice(0, 3) + '***' + address.slice(-2);
}

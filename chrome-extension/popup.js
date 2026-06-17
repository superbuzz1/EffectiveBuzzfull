document.addEventListener('DOMContentLoaded', () => {
  const apiKeyInput = document.getElementById('api-key');
  const captureBtn = document.getElementById('capture-btn');
  const statusText = document.getElementById('status-text');
  const resultDiv = document.getElementById('result');

  // Load saved API key
  chrome.storage.local.get(['eb_api_key'], (result) => {
    if (result.eb_api_key) apiKeyInput.value = result.eb_api_key;
  });

  apiKeyInput.addEventListener('change', (e) => {
    chrome.storage.local.set({ eb_api_key: e.target.value });
  });

  // Query active tab to see if we're on a valid lead profile
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (tab.url.includes('linkedin.com/in/')) {
      statusText.innerText = "Lead Profile Detected: LinkedIn";
      captureBtn.disabled = false;
    } else {
      statusText.innerText = "Navigate to a LinkedIn profile to capture.";
    }
  });

  captureBtn.addEventListener('click', () => {
    const apiKey = apiKeyInput.value.trim();
    if (!apiKey) {
      resultDiv.className = 'error';
      resultDiv.innerText = "Please enter an API Key.";
      return;
    }

    captureBtn.disabled = true;
    captureBtn.innerText = "Extracting...";

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "extract_lead" }, (response) => {
        if (chrome.runtime.lastError || !response) {
          resultDiv.className = 'error';
          resultDiv.innerText = "Could not extract lead data. Please refresh the page.";
          captureBtn.disabled = false;
          captureBtn.innerText = "Capture Lead to Pipeline";
          return;
        }

        // Send to EffectiveBuzz API
        captureBtn.innerText = "Syncing to CRM...";
        const API_URL = "http://localhost:3000/api/v2/crm/linkedin/sync"; // In production: https://app.effectivebuzz.online/api/v2/crm...
        
        fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify(response.data)
        })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            resultDiv.className = 'success';
            resultDiv.innerText = "Lead successfully captured and Workflow triggered!";
            captureBtn.innerText = "Captured!";
          } else {
            throw new Error(data.error || "Sync failed");
          }
        })
        .catch(err => {
          resultDiv.className = 'error';
          resultDiv.innerText = "Error: " + err.message;
          captureBtn.disabled = false;
          captureBtn.innerText = "Try Again";
        });
      });
    });
  });
});

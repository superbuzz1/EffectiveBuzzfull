chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "extract_lead") {
    try {
      // Basic DOM Extraction for LinkedIn Profile
      const fullNameElement = document.querySelector('h1.text-heading-xlarge');
      const headlineElement = document.querySelector('div.text-body-medium.break-words');
      const companyElement = document.querySelector('button[aria-label^="Current company"] div');
      const locationElement = document.querySelector('span.text-body-small.inline.t-black--light.break-words');

      const data = {
        fullName: fullNameElement ? fullNameElement.innerText.trim() : '',
        jobTitle: headlineElement ? headlineElement.innerText.trim() : '',
        company: companyElement ? companyElement.innerText.trim() : '',
        location: locationElement ? locationElement.innerText.trim() : '',
        linkedinUrl: window.location.href,
        source: 'linkedin_extension'
      };

      sendResponse({ success: true, data });
    } catch (err) {
      sendResponse({ success: false, error: err.message });
    }
  }
  return true; // Keep message channel open for async response
});

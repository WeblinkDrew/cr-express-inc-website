// Autofill Form Test Script for React Forms
// Paste this into the browser console on the form page to auto-fill all fields

(function() {
  console.log('🚀 Starting autofill for React form...');

  // Helper function to set React input value (works with controlled components)
  function setReactValue(element, value) {
    const lastValue = element.value;
    element.value = value;

    // Trigger React's onChange by using the native setter
    const event = new Event('input', { bubbles: true });
    const tracker = element._valueTracker;
    if (tracker) {
      tracker.setValue(lastValue);
    }
    element.dispatchEvent(event);
  }

  // Helper function to fill input by placeholder
  function fillByPlaceholder(placeholder, value) {
    const input = document.querySelector(`input[placeholder="${placeholder}"], textarea[placeholder="${placeholder}"]`);
    if (input) {
      setReactValue(input, value);
      console.log(`✓ Filled: ${placeholder}`);
      return true;
    }
    console.log(`✗ Not found: ${placeholder}`);
    return false;
  }

  // Helper function to fill select by value
  function selectByValue(selectElement, value) {
    if (selectElement) {
      setReactValue(selectElement, value);
      selectElement.dispatchEvent(new Event('change', { bubbles: true }));
      console.log(`✓ Selected: ${value}`);
      return true;
    }
    return false;
  }

  // Helper function to find and fill input by label text
  function fillByLabel(labelText, value) {
    const labels = Array.from(document.querySelectorAll('label'));
    const label = labels.find(l => l.textContent.includes(labelText));
    if (label) {
      const input = label.querySelector('input, textarea') ||
                   document.querySelector(`#${label.getAttribute('for')}`);
      if (input && input.type !== 'checkbox' && input.type !== 'radio' && input.type !== 'file') {
        setReactValue(input, value);
        console.log(`✓ Filled by label "${labelText}": ${value}`);
        return true;
      }
    }
    return false;
  }

  // Helper function to check checkbox by label text
  function checkByText(text) {
    const labels = Array.from(document.querySelectorAll('label'));
    const label = labels.find(l => l.textContent.trim() === text || l.textContent.includes(text));
    if (label) {
      const checkbox = label.querySelector('input[type="checkbox"]');
      if (checkbox && !checkbox.checked) {
        checkbox.click();
        console.log(`✓ Checked: ${text}`);
        return true;
      }
    }
    return false;
  }

  // Helper function to select radio by label text
  function selectRadioByText(text) {
    const labels = Array.from(document.querySelectorAll('label'));
    const label = labels.find(l => l.textContent.trim() === text);
    if (label) {
      const radio = label.querySelector('input[type="radio"]');
      if (radio) {
        radio.click();
        console.log(`✓ Selected radio: ${text}`);
        return true;
      }
    }
    return false;
  }

  // Wait for page to be ready
  setTimeout(() => {
    console.log('\n📝 Filling Basic Client Information...');

    // Find all inputs and selects in order
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea, select');

    // Company Legal Name (first text input)
    if (inputs[0]) {
      setReactValue(inputs[0], 'Test Logistics Company LLC');
      console.log('✓ Company Legal Name');
    }

    // Division (second text input)
    if (inputs[1]) {
      setReactValue(inputs[1], 'Freight Division');
      console.log('✓ Division');
    }

    // Branch Address
    fillByPlaceholder('Address Line 1', '123 Main Street');
    fillByPlaceholder('City', 'Chicago');

    // State dropdown - find first select
    const stateSelects = document.querySelectorAll('select');
    if (stateSelects[0]) {
      selectByValue(stateSelects[0], 'IL');
    }

    fillByPlaceholder('ZIP Code', '60601');

    // MC, DOT, SCAC (next three text inputs after address)
    const textInputs = Array.from(document.querySelectorAll('input[type="text"]'));
    const mcInput = textInputs.find((input, idx) => {
      const label = input.closest('div')?.querySelector('label');
      return label?.textContent.includes('MC');
    });
    if (mcInput) {
      setReactValue(mcInput, 'MC123456');
      console.log('✓ MC');
    }

    const dotInput = textInputs.find((input, idx) => {
      const label = input.closest('div')?.querySelector('label');
      return label?.textContent.includes('DOT');
    });
    if (dotInput) {
      setReactValue(dotInput, 'DOT789012');
      console.log('✓ DOT');
    }

    const scacInput = textInputs.find((input, idx) => {
      const label = input.closest('div')?.querySelector('label');
      return label?.textContent.includes('SCAC');
    });
    if (scacInput) {
      setReactValue(scacInput, 'TSTL');
      console.log('✓ SCAC Code');
    }

  }, 100);

  setTimeout(() => {
    console.log('\n👥 Filling Contact Information...');

    // Primary Contact
    fillByPlaceholder('First Name', 'John');
    const inputs = Array.from(document.querySelectorAll('input[type="text"]'));
    const lastNameInputs = inputs.filter(i => i.placeholder === 'Last Name');
    if (lastNameInputs[0]) {
      setReactValue(lastNameInputs[0], 'Smith');
      console.log('✓ Primary Contact Last Name');
    }

    const emailInputs = document.querySelectorAll('input[type="email"]');
    if (emailInputs[0]) {
      setReactValue(emailInputs[0], 'john.smith@testlogistics.com');
      console.log('✓ Primary Contact Email');
    }

    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    if (phoneInputs[0]) {
      setReactValue(phoneInputs[0], '3125551234');
      console.log('✓ Primary Contact Phone');
    }

    // Secondary Contact
    if (lastNameInputs[1]) {
      setReactValue(lastNameInputs[1], 'Doe');
      console.log('✓ Secondary Contact Last Name');
    }

    const firstNameInputs = inputs.filter(i => i.placeholder === 'First Name');
    if (firstNameInputs[1]) {
      setReactValue(firstNameInputs[1], 'Jane');
      console.log('✓ Secondary Contact First Name');
    }

    if (emailInputs[1]) {
      setReactValue(emailInputs[1], 'jane.doe@testlogistics.com');
      console.log('✓ Secondary Contact Email');
    }

    if (phoneInputs[1]) {
      setReactValue(phoneInputs[1], '3125555678');
      console.log('✓ Secondary Contact Phone');
    }

  }, 300);

  setTimeout(() => {
    console.log('\n📞 Filling Escalation & AP Contacts...');

    const inputs = Array.from(document.querySelectorAll('input[type="text"]'));
    const firstNameInputs = inputs.filter(i => i.placeholder === 'First Name');
    const lastNameInputs = inputs.filter(i => i.placeholder === 'Last Name');
    const emailInputs = document.querySelectorAll('input[type="email"]');
    const phoneInputs = document.querySelectorAll('input[type="tel"]');

    // Escalation Contact (3rd contact)
    if (firstNameInputs[2]) {
      setReactValue(firstNameInputs[2], 'Mike');
      console.log('✓ Escalation First Name');
    }
    if (lastNameInputs[2]) {
      setReactValue(lastNameInputs[2], 'Johnson');
      console.log('✓ Escalation Last Name');
    }
    if (emailInputs[2]) {
      setReactValue(emailInputs[2], 'mike.johnson@testlogistics.com');
      console.log('✓ Escalation Email');
    }
    if (phoneInputs[2]) {
      setReactValue(phoneInputs[2], '3125559012');
      console.log('✓ Escalation Phone');
    }

    // AP Contact (4th contact)
    if (firstNameInputs[3]) {
      setReactValue(firstNameInputs[3], 'Sarah');
      console.log('✓ AP First Name');
    }
    if (lastNameInputs[3]) {
      setReactValue(lastNameInputs[3], 'Williams');
      console.log('✓ AP Last Name');
    }
    if (emailInputs[3]) {
      setReactValue(emailInputs[3], 'ap@testlogistics.com');
      console.log('✓ AP Email');
    }
    if (phoneInputs[3]) {
      setReactValue(phoneInputs[3], '3125553456');
      console.log('✓ AP Phone');
    }

  }, 500);

  setTimeout(() => {
    console.log('\n💰 Filling Financial Information...');

    // Billing Address (should be second set of address fields)
    const addressInputs = Array.from(document.querySelectorAll('input[placeholder="Address Line 1"]'));
    if (addressInputs[1]) {
      setReactValue(addressInputs[1], '456 Billing Street');
      console.log('✓ Billing Address Line 1');
    }

    const cityInputs = Array.from(document.querySelectorAll('input[placeholder="City"]'));
    if (cityInputs[1]) {
      setReactValue(cityInputs[1], 'Chicago');
      console.log('✓ Billing City');
    }

    // Billing State (second select)
    const selects = document.querySelectorAll('select');
    if (selects[1]) {
      selectByValue(selects[1], 'IL');
    }

    const zipInputs = Array.from(document.querySelectorAll('input[placeholder="ZIP Code"]'));
    if (zipInputs[1]) {
      setReactValue(zipInputs[1], '60602');
      console.log('✓ Billing ZIP');
    }

    // Invoicing Instructions
    const textarea = document.querySelector('textarea');
    if (textarea) {
      setReactValue(textarea, 'Please email invoices to AP department. Include PO number on all invoices.');
      console.log('✓ Invoicing Instructions');
    }

    // Payment Method - find the input after billing address
    const allTextInputs = Array.from(document.querySelectorAll('input[type="text"]'));
    const paymentInput = allTextInputs[allTextInputs.length - 3]; // Usually near the end before operations
    if (paymentInput) {
      setReactValue(paymentInput, 'ACH');
      console.log('✓ Payment Method');
    }

  }, 700);

  setTimeout(() => {
    console.log('\n🚚 Filling Operations Information...');

    // Shipment Types
    checkByText('Air Import');
    checkByText('Air Export');
    checkByText('Drayage');

    // Equipment Types
    checkByText('Dry Van');
    checkByText('Flatbed');
    checkByText('Reefer');

    // Shipment Build
    checkByText('Palletized');
    checkByText("Intact (ULD's)");

    // Additional Requirements
    checkByText('TSA Approved Drivers');
    checkByText('Customs Bonded Trucks');

  }, 900);

  setTimeout(() => {
    console.log('\n📊 Filling Final Operations Questions...');

    // Monthly Shipments - second to last text input
    const allTextInputs = Array.from(document.querySelectorAll('input[type="text"]'));
    const monthlyInput = allTextInputs[allTextInputs.length - 2];
    if (monthlyInput) {
      setReactValue(monthlyInput, '50-100 shipments per month');
      console.log('✓ Monthly Shipments');
    }

    // Exception Communication - last text input before radios
    const exceptionInput = allTextInputs[allTextInputs.length - 1];
    if (exceptionInput) {
      setReactValue(exceptionInput, 'Please notify via email and phone for all exceptions');
      console.log('✓ Exception Communication');
    }

    // Review Frequency - Monthly
    selectRadioByText('Monthly');

  }, 1100);

  setTimeout(() => {
    console.log('\n✅ Form autofill complete!');
    console.log('⚠️  IMPORTANT: You still need to upload the W9 PDF file manually.');
    console.log('📄 Scrolling to W9 upload section...\n');

    // Scroll to W9 upload
    const w9Section = document.getElementById('w9-upload');
    if (w9Section) {
      w9Section.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Highlight the W9 upload area
      setTimeout(() => {
        const uploadArea = w9Section.closest('div[class*="border"]');
        if (uploadArea) {
          uploadArea.style.border = '3px solid #3b82f6';
          uploadArea.style.animation = 'pulse 2s infinite';
          console.log('💡 W9 upload area highlighted in blue');
        }
      }, 500);
    }
  }, 1300);

})();


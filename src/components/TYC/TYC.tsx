import React from 'react'

const TYC = () => {
    const today = new Date();
    const monthTYC = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
    const dayTYC = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
    const dateTYC = dayTYC + '-' + monthTYC + '-' + today.getFullYear();
    const supportEmail = 'rami.ror279@gmail.com';
    return (
        <div className='card bg-info text-black bg-opacity-25 p-2'>
            <h3 className='mt-3 text-center fs-1'>Terms and Conditions</h3>
            <h6 className='mt-2 text-end'>Last updated: {dateTYC}</h6>

            <h4 className='text-center mt-3'>
                Welcome to our Progressive Web App (PWA). These terms and conditions outline the rules and regulations for the use of our PWA developed with Next.js and Nest.js for educational and demonstrative purposes.
            </h4>

            <h6 className='mt-2'>
                By accessing this PWA, we assume you accept these terms and conditions. Do not continue to use the PWA if you do not agree to all of the terms and conditions stated on this page.
            </h6>

            <h5 className='mt-2'>
                1. Use of the Application
            </h5>
            <h6 className='mt-2'>
                1.1. This PWA is intended solely for educational and demonstrative purposes. It is not designed or intended for use in a production environment or with sensitive data.
            </h6>

            <h6 className='mt-2'>
                1.2. By using this PWA, you agree to use it only for its intended purposes and not to engage in any activity that could harm its operation or the experience of other users.
            </h6>

            <h5 className='mt-2'>
                2. Intellectual Property
            </h5>
            <h6 className='mt-2'>
                2.1. All intellectual property rights and other rights in the materials contained in this PWA are owned by us or our licensors. You may access this PWA for personal use subject to the restrictions set in these terms and conditions.
            </h6>

            <h6 className='mt-2'>
                2.2. You must not:
            </h6>

            <h6 className='mt-2'>
                Sell, rent, or sub-license material from the PWA.
            </h6>
            <h6 className='mt-2'>
                Reproduce, duplicate, or copy material from the PWA.
            </h6>
            <h6 className='mt-2'>
                Redistribute content from the PWA (unless content is specifically made for redistribution).
            </h6>

            <h5 className='mt-2'>
                3. Limitation of Liability
            </h5>
            <h6 className='mt-2'>
                3.1. This PWA is provided &quot;as is&quot; and &quot;as available&quot;. We make no representations or warranties of any kind, express or implied, about the operation of the PWA or the information, content, or materials included on it.
            </h6>

            <h6 className='mt-2'>
                3.2. To the fullest extent permissible by applicable law, we shall not be liable for any damages arising out of or in connection with the use of this PWA.
            </h6>

            <h5 className='mt-2'>
                4. Modifications
            </h5>
            <h6 className='mt-2'>
                4.1. We reserve the right to modify or replace these terms and conditions at any time. If a revision is material, we will try to provide at least 30 days notice before any new terms take effect. What constitutes a material change will be determined at our sole discretion.
            </h6>

            <h5 className='mt-2'>
                5. Governing Law
            </h5>
            <h6 className='mt-2'>
                5.1. These terms and conditions are governed by and construed in accordance with the laws of México, and you irrevocably submit to the exclusive jurisdiction of the courts in that location to resolve any disputes.
            </h6>


            <h5 className='mt-2'>
                6. Contact
            </h5>
            <h6 className='mt-2'>
                6.1. If you have any questions about these terms and conditions, please contact us at {supportEmail}.
            </h6>

            <h5 className='mt-2'>
                Acceptance of the Terms
            </h5>
            <h6 className='mt-2'>
                By using our PWA, you agree that you have read, understood, and accepted these terms and conditions.
            </h6>
        </div>
    )
}

export default TYC
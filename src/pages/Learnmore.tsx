import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './Navbar';

const LearnMore: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <>
      <NavBar /> {/* NavBar is added here */}
      <div style={{ padding: '2rem', maxWidth: '800px', margin: 'auto' }}>
        <h1>What is Circle's Programmable Wallet?</h1>

        <p>
          Circle's Programmable Wallet is a special type of digital wallet that we’ve added to make managing your assets easier and more secure. With this wallet, you can safely store and manage things like cryptocurrencies, all in one place.
        </p>

        <h2>How Does It Work?</h2>

        <p>
          When you create an account here, we automatically create a digital wallet for you. This wallet keeps your funds safe and allows you to send and receive payments quickly. It's designed to give you full control over your digital assets.
        </p>

        <h2>Key Benefits</h2>

        <p><strong>Security:</strong> Your wallet is protected with advanced security features, ensuring your funds are safe from unauthorized access.</p>
        <p><strong>Easy to Use:</strong> You can manage your wallet right here in this app. Whether you want to make a payment or check your balance, everything is simple and intuitive.</p>
        <p><strong>Full Control:</strong> Only you have access to your wallet. You decide when to send or receive money, and you can always see what’s happening with your funds.</p>

        <h2>Why Should I Use It?</h2>

        <p>
          Circle’s Programmable Wallet gives you the power to control your digital money. You don't need to worry about complicated processes—it's all managed automatically in the background. Plus, you have the peace of mind that your money is secure.
        </p>

        <h2>Want to Learn More?</h2>

        <p>
          If you're curious about the details of how Circle's Programmable Wallet works, you can explore more about it. Just click the button below to dive deeper into how everything runs behind the scenes.
        </p>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button
            onClick={handleBack}
            style={{ marginRight: '1rem', padding: '0.5rem 1rem', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Go Back
          </button>
          <a
            href="https://developers.circle.com/docs/programmable-wallet-overview"
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: '0.5rem 1rem', border: '2px solid #007BFF', borderRadius: '4px', color: '#007BFF', textDecoration: 'none', cursor: 'pointer' }}
          >
            Learn More
          </a>
        </div>
      </div>
    </>
  );
};

export default LearnMore;

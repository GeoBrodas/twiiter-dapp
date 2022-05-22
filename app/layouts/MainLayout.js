import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { AiFillHome } from 'react-icons/ai';
import { FiTrendingUp } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import { GrSearchAdvanced } from 'react-icons/gr';
import Link from 'next/link';

function MainLayout({ children }) {
  const { connected } = useWallet();

  return (
    <div className="flex justify-between py-6">
      <div className="mx-auto flex w-1/3 flex-col border-r border-white">
        <div
          style={{
            letterSpacing: '0.1em',
          }}
          className="text mx-auto my-10 text-3xl"
        >
          🐤 + 🛢
        </div>

        <Link href="/">
          <button className="side-btn">
            <AiFillHome className="icon" />
            Home
          </button>
        </Link>

        {/* active only if "connected" */}
        {connected && (
          <button className="side-btn">
            <CgProfile className="icon" />
            Profile
          </button>
        )}
        <button className="side-btn">
          <GrSearchAdvanced className="icon" />
          Users
        </button>

        <Link href="/topics">
          <button className="side-btn">
            <FiTrendingUp className="icon" />
            Topics
          </button>
        </Link>

        <div className="mx-auto my-4">
          <WalletMultiButton />
        </div>
      </div>
      <div className="mx-4 w-2/3">{children}</div>
      <div className="mx-auto w-1/3"></div>
    </div>
  );
}

export default MainLayout;

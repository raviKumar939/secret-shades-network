# Vercel Deployment Guide - Secret Shades Network

## 🚀 Step-by-Step Vercel Deployment Instructions

### Prerequisites
- GitHub repository: `https://github.com/raviKumar939/secret-shades-network`
- Vercel account (free tier available)
- Environment variables ready

### Step 1: Connect to Vercel

1. **Visit Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project" button
   - Select "Import Git Repository"
   - Choose `raviKumar939/secret-shades-network`
   - Click "Import"

### Step 2: Configure Project Settings

1. **Project Configuration**
   - **Project Name**: `secret-shades-network`
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

2. **Environment Variables**
   Click "Environment Variables" and add the following:

   ```env
   VITE_CHAIN_ID=11155111
   VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
   VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
   VITE_INFURA_API_KEY=YOUR_INFURA_API_KEY
   VITE_FHEVM_NETWORK_URL=https://api.testnet.fhevm.org
   VITE_CONTRACT_ADDRESS=
   ```

   **Important**: 
   - Set all variables for **Production**, **Preview**, and **Development** environments
   - Leave `VITE_CONTRACT_ADDRESS` empty initially (will be filled after contract deployment)

### Step 3: Deploy Smart Contracts (Optional)

1. **Deploy to Sepolia Testnet**
   ```bash
   # In your local project directory
   npm run deploy
   ```

2. **Update Contract Address**
   - Copy the deployed contract address
   - Update `VITE_CONTRACT_ADDRESS` in Vercel environment variables
   - Redeploy the frontend

### Step 4: Deploy Frontend

1. **Initial Deployment**
   - Click "Deploy" button in Vercel dashboard
   - Wait for build to complete (should take 2-3 minutes)

2. **Verify Deployment**
   - Check build logs for any errors
   - Visit the provided Vercel URL
   - Test wallet connection functionality

### Step 5: Custom Domain (Optional)

1. **Add Custom Domain**
   - Go to Project Settings → Domains
   - Click "Add Domain"
   - Enter your domain name
   - Follow DNS configuration instructions

2. **SSL Certificate**
   - Vercel automatically provides SSL certificates
   - HTTPS will be enabled automatically

### Step 6: Production Optimization

1. **Performance Monitoring**
   - Enable Vercel Analytics (optional)
   - Monitor Core Web Vitals
   - Check build performance

2. **Automatic Deployments**
   - Every push to `main` branch triggers automatic deployment
   - Preview deployments for pull requests
   - Branch protection rules recommended

## 🔧 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check build logs in Vercel dashboard
   # Common fixes:
   - Ensure all environment variables are set
   - Check for missing dependencies
   - Verify Node.js version compatibility
   ```

2. **Wallet Connection Issues**
   ```bash
   # Verify environment variables:
   - VITE_WALLET_CONNECT_PROJECT_ID is correct
   - VITE_CHAIN_ID matches your target network
   - RPC URLs are accessible
   ```

3. **Contract Interaction Issues**
   ```bash
   # Check contract deployment:
   - Verify VITE_CONTRACT_ADDRESS is set
   - Ensure contract is deployed on correct network
   - Check FHEVM network connectivity
   ```

### Build Configuration

The project is configured with:
- **Node.js Version**: 18.x (Vercel default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework**: Vite + React + TypeScript

### Environment Variables Reference

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `VITE_CHAIN_ID` | Ethereum chain ID | Yes | `11155111` (Sepolia) |
| `VITE_RPC_URL` | RPC endpoint URL | Yes | `https://sepolia.infura.io/v3/...` |
| `VITE_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID | Yes | `YOUR_WALLET_CONNECT_PROJECT_ID` |
| `VITE_INFURA_API_KEY` | Infura API key | Optional | `YOUR_INFURA_API_KEY` |
| `VITE_FHEVM_NETWORK_URL` | FHEVM network URL | Yes | `https://api.testnet.fhevm.org` |
| `VITE_CONTRACT_ADDRESS` | Deployed contract address | Yes | `0x...` (after deployment) |

## 📊 Deployment Checklist

- [ ] GitHub repository connected to Vercel
- [ ] All environment variables configured
- [ ] Build command and output directory set correctly
- [ ] Initial deployment successful
- [ ] Wallet connection working
- [ ] Smart contracts deployed (if applicable)
- [ ] Contract address updated in environment variables
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Performance monitoring enabled (optional)

## 🔄 Continuous Deployment

The project is set up for continuous deployment:
- **Main Branch**: Automatic production deployments
- **Feature Branches**: Preview deployments
- **Pull Requests**: Automatic preview deployments

## 📞 Support

If you encounter issues:
1. Check Vercel build logs
2. Verify environment variables
3. Test locally with `npm run build`
4. Check GitHub repository for latest changes

## 🎉 Success!

Once deployed, your Secret Shades Network will be available at:
- **Vercel URL**: `https://secret-shades-network.vercel.app`
- **Custom Domain**: `https://yourdomain.com` (if configured)

The platform includes:
- ✅ Real wallet connection with RainbowKit
- ✅ FHE-encrypted social graph
- ✅ Privacy-preserving messaging
- ✅ Smart contract integration
- ✅ Production-ready build
- ✅ Responsive design
- ✅ SEO optimization

---

**Last Updated**: January 2025  
**Maintainer**: raviKumar939  
**Repository**: https://github.com/raviKumar939/secret-shades-network

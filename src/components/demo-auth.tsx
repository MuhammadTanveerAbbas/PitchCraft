import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from "@/components/ui/checkbox"
import { Building, Factory, ShoppingCart, HeartPulse, Bitcoin, Copy } from 'lucide-react';
import Cookies from 'js-cookie';

interface DemoAuthProps {
  onAuthenticated: () => void;
}

const DUMMY_ACCOUNTS = [
  { email: 'realestate@company.com', password: 're123', icon: Building },
  { email: 'manufacturing@company.com', password: 'mfg123', icon: Factory },
  { email: 'ecommerce@company.com', password: 'ecom123', icon: ShoppingCart },
  { email: 'healthcare@company.com', password: 'hc123', icon: HeartPulse },
  { email: 'fintech@company.com', password: 'ft123', icon: Bitcoin },
];

export default function DemoAuth({ onAuthenticated }: DemoAuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [sideMessage, setSideMessage] = useState<{ email: string; password: string } | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const account = DUMMY_ACCOUNTS.find(
      acc => acc.email === email && acc.password === password
    );

    if (account) {
      if (rememberMe) {
        Cookies.set('rememberedUser', email, { expires: 7 });
      }
      onAuthenticated();
    } else {
      setError('Invalid credentials. Try one of the demo accounts below.');
    }
  };

  const handleDemoClick = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setSideMessage({ email: demoEmail, password: demoPassword });
  };

  const handleCopy = () => {
    if (sideMessage) {
      navigator.clipboard.writeText(`Email: ${sideMessage.email}\nPassword: ${sideMessage.password}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-lg p-8 bg-card/50 border-white/10">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl font-bold text-white mb-3">Demo Access</h2>
          <p className="text-gray-300 text-lg">
            Login to try PitchCraft demo
          </p>
        </div>
        <div className="space-y-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-white font-semibold">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="h-12 bg-accent/20 border-white/20 text-white placeholder:text-gray-400"
                required
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="password" className="text-white font-semibold">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="h-12 bg-accent/20 border-white/20 text-white placeholder:text-gray-400"
                required
              />
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox id="remember" checked={rememberMe} onCheckedChange={() => setRememberMe(!rememberMe)} className="border-white/20" />
              <label
                htmlFor="remember"
                className="text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
            {error && (
              <p className="text-red-400 bg-red-500/10 p-3 rounded-lg">{error}</p>
            )}
            <Button type="submit" className="w-full h-12 bg-white text-black hover:bg-gray-200 font-semibold rounded-xl">
              Login
            </Button>
          </form>

          <Separator />

          <div className="space-y-4">
            <p className="text-gray-300 text-center font-medium">
              Quick demo accounts:
            </p>
            <div className="grid grid-cols-5 gap-3">
              {DUMMY_ACCOUNTS.map((account, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  onClick={() => handleDemoClick(account.email, account.password)}
                  className="h-14 w-14 border-white/20 text-white hover:bg-white/10 rounded-xl"
                >
                  <account.icon className="h-7 w-7" />
                </Button>
              ))}
            </div>
            {sideMessage && (
              <Card className="p-4 mt-4 bg-accent/20 border-white/10">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-white font-semibold">{sideMessage.email}</div>
                    <div className="text-gray-400">Password: {sideMessage.password}</div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleCopy} className="text-white hover:bg-white/10">
                    <Copy className="h-5 w-5" />
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
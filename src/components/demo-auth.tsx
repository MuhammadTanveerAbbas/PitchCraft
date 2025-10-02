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
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Demo Access</h2>
          <p className="text-muted-foreground mt-2">
            Login to try PitchCraft demo
          </p>
        </div>
        <div className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" checked={rememberMe} onCheckedChange={() => setRememberMe(!rememberMe)} />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <Separator />

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground text-center">
              Quick demo accounts:
            </p>
            <div className="grid grid-cols-5 gap-2">
              {DUMMY_ACCOUNTS.map((account, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  onClick={() => handleDemoClick(account.email, account.password)}
                  className="h-12 w-12"
                >
                  <account.icon className="h-6 w-6 text-muted-foreground" />
                </Button>
              ))}
            </div>
            {sideMessage && (
              <Card className="p-4 mt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-semibold">{sideMessage.email}</div>
                    <div className="text-xs text-muted-foreground">Password: {sideMessage.password}</div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleCopy}>
                    <Copy className="h-4 w-4" />
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
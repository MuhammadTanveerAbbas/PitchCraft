// Input validation and sanitization utilities

export const sanitizeInput = (input: string): string => {
  // Remove potentially dangerous characters and scripts
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();
};

export const validateCoreProblem = (problem: string): { valid: boolean; error?: string } => {
  const sanitized = sanitizeInput(problem);
  
  if (sanitized.length < 10) {
    return { valid: false, error: 'Problem description must be at least 10 characters.' };
  }
  
  if (sanitized.length > 500) {
    return { valid: false, error: 'Problem description is too long (max 500 characters).' };
  }
  
  // Check for meaningful content (not just spaces or special characters)
  if (!/[a-zA-Z]{3,}/.test(sanitized)) {
    return { valid: false, error: 'Please provide a meaningful problem description.' };
  }
  
  return { valid: true };
};

export const validateStartupName = (name: string): { valid: boolean; error?: string } => {
  const sanitized = sanitizeInput(name);
  
  if (sanitized.length < 2) {
    return { valid: false, error: 'Startup name must be at least 2 characters.' };
  }
  
  if (sanitized.length > 50) {
    return { valid: false, error: 'Startup name is too long (max 50 characters).' };
  }
  
  return { valid: true };
};

export const rateLimitCheck = (key: string, limitMs: number = 10000): boolean => {
  if (typeof window === 'undefined') return true;
  
  const lastTime = localStorage.getItem(key);
  if (!lastTime) return true;
  
  const timeSince = Date.now() - parseInt(lastTime);
  return timeSince >= limitMs;
};

export const setRateLimit = (key: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, Date.now().toString());
};

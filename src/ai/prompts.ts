import { foodAgentPrompt } from 'delivery-ai-agents-common';

export const SUPPORT_PHONE = '+234 803 000 0000';
export const SUPPORT_EMAIL = 'hello@shadowspark.tech';

/** System prompt for the food vertical — SDK template + a ShadowSpark gloss. */
export function buildSystemPrompt(): string {
  return foodAgentPrompt({
    storeName: 'ShadowSpark Cyberfood',
    cities: ['Lagos', 'Abuja', 'Port Harcourt', 'Owerri', 'Kano', 'Ibadan'],
    currency: 'NGN (₦)',
    supportPhone: SUPPORT_PHONE,
  });
}

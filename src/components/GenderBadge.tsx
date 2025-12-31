import { cn } from '@/lib/utils';

interface GenderBadgeProps {
    gender: 'Male' | 'Female';
}

export function GenderBadge({ gender }: GenderBadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center justify-center px-4 py-1.5 rounded-full text-sm font-medium',
                'bg-gender-male-bg text-gender-male-text'
            )}
        >
            {gender}
        </span>
    );
}

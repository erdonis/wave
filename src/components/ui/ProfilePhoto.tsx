import Link from 'next/link';
import { getAvatarFallback } from '@/lib/getAvatarFallback';
import { FallbackProfilePhoto } from './FallbackProfilePhoto';

export function ProfilePhoto({
  name,
  photoUrl,
  username,
  fallbackAvatarClassName,
}: {
  name: string;
  username: string;
  photoUrl?: string | null;
  fallbackAvatarClassName?: string;
}) {
  return (
    <Link href={`/${username}`}>
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={getAvatarFallback(name)}
          className="h-full w-full cursor-pointer rounded-full bg-muted object-cover"
        />
      ) : (
        <FallbackProfilePhoto name={name} className={fallbackAvatarClassName} />
      )}
    </Link>
  );
}

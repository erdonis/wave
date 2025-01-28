import { Posts } from '@/components/Posts';
import PageHeader from '@/components/PageHeader';

export default function Page({ params }: { params: { hashtag: string } }) {
  return (
    <div className="px-4 pt-4">
      <PageHeader heading={`#${params.hashtag}`} />
      <Posts type="hashtag" hashtag={params.hashtag} />
    </div>
  );
}

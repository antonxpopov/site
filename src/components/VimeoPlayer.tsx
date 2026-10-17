interface VimeoPlayerProps {
  videoId: string | number;
  title?: string;
}

const getVideoId = (id: string | number): string => {
  if (typeof id === 'string') {
    const urlMatch = id.match(/(?:vimeo\.com\/)(\d+)/);
    if (urlMatch) {
      return urlMatch[1];
    }
    return id;
  }
  return String(id);
};

export default function VimeoPlayer({ videoId, title }: VimeoPlayerProps) {
  if (!videoId) {
    return null;
  }

  const vimeoId = getVideoId(videoId);

  return (
    <div className="relative w-full aspect-video bg-bg rounded-lg overflow-hidden mb-8">
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479`}
        className="absolute inset-0 w-full h-full"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title={title || 'Vimeo video player'}
        loading="lazy"
      />
    </div>
  );
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function findVideoBySlug(slug: string, videos: any[]): any {
  return videos.find(video => generateSlug(video.title) === slug);
} 
import { Slide, Theme } from '@/lib/types';
import { cn } from '@/lib/utils';
// import Image from 'next/image';

interface Props {
    slide: Slide;
    theme: Theme;
}
export default function ThumbnailPreview({ slide, theme }: Props) {
    // WIP: Add a preview of the slides
    return (
        <div
            className={cn(
                'w-full relative aspect-[16/9] rounded-lg overflow-hidden transition-all duration-200'
            )}
            style={{
                fontFamily: theme.fontFamily,
                color: theme.accentColor,
                backgroundColor: theme.slideBackgroundColor,
                backgroundImage: theme.gradientBackground,
            }}
        >
            {slide ? (
                <div className="scale-[0.5] origin-top-left w-[200%] h-[200%] overflow-hidden">
                    this is the slide
                </div>
            ) : (
                <div className="w-full h-full bg-gray-400 flex justify-center items-center">
                    {/* <Image className="w-6 h-6 text-gray-500" alt="slide" src={''} /> */}
                </div>
            )}
        </div>
    );
}

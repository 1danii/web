import { PlayCircleIcon } from "@heroicons/react/24/solid";
import { useStore } from "@nanostores/react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { AnimatePresence, motion } from "framer-motion";
import { atom } from "nanostores";
import { useEffect, type PropsWithChildren } from "react";
import { useHotkeys } from "react-hotkeys-hook";

type Media = {
  type: "image" | "video";
  src: string;
  colSpan?: number;
  rowSpan?: number;
};

const $images = atom<Record<string, Media[]>>({});
const $currentImage = atom<{ project: string; index: number } | null>(null);
function registerImage(project: string, image: Media) {
  const images = $images.get()[project] ?? [];
  $images.set({
    ...$images.value,
    [project]: [...images, image],
  });
}

function ImagePreview({
  project,
  src,
  index,
  type,
  colSpan = 1,
  rowSpan = 1,
}: Media & { project: string; index: number }) {
  useEffect(() => {
    registerImage(project, { src, type });
  }, []);

  return (
    <button
      onClick={() => {
        $currentImage.set({ project, index });
      }}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
      }}
      className="relative aspect-video size-full cursor-zoom-in overflow-hidden rounded-xl"
    >
      {type === "image" ? (
        <img className="size-full object-cover" alt={""} src={src} />
      ) : (
        <>
          <PlayCircleIcon className="absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2 text-(--dark)/75" />
          <video src={src} muted className="size-full object-cover" />
        </>
      )}
    </button>
  );
}

export function ImageGallery({
  project,
  images,
}: PropsWithChildren<{ project: string; images: Media[] }>) {
  const globalImagePath = useStore($currentImage);
  const currentImagePath =
    globalImagePath?.project === project ? globalImagePath : null;
  const currentImage = currentImagePath ? images[currentImagePath.index] : null;

  const nextImage = () => {
    if (currentImagePath && currentImagePath.index < images.length - 1) {
      $currentImage.set({ project, index: currentImagePath.index + 1 });
    }
  };
  const previousImage = () => {
    if (currentImagePath && currentImagePath.index > 0) {
      $currentImage.set({ project, index: currentImagePath.index - 1 });
    }
  };

  useHotkeys("left", previousImage, { enabled: !!currentImage });
  useHotkeys("right", nextImage, { enabled: !!currentImage });

  return (
    <>
      <div className="grid grid-cols-3 gap-2 pt-2 print:hidden">
        {images.map((img, i) => (
          <ImagePreview index={i} key={i} project={project} {...img} />
        ))}
      </div>
      <Dialog
        open={!!currentImage}
        onOpenChange={() => $currentImage.set(null)}
      >
        <AnimatePresence>
          {currentImage && (
            <DialogPortal forceMount>
              <DialogOverlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="bg-background/75 fixed inset-0 backdrop-blur-lg"
                />
              </DialogOverlay>
              <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                <DialogContent asChild>
                  <div>
                    <motion.div
                      className="relative flex items-center justify-center outline-none"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      {currentImage.type === "image" ? (
                        <img
                          className="size-full max-h-[70vh] object-contain md:max-w-[70vw]"
                          src={currentImage.src}
                          // alt={currentImage.alt}
                        />
                      ) : (
                        <video
                          className="size-full max-h-[70vh] object-contain md:max-w-[70vw]"
                          src={currentImage.src}
                          autoPlay
                          muted
                          playsInline
                          loop
                        />
                      )}
                      <VisuallyHidden>
                        <DialogTitle>Image preview</DialogTitle>
                      </VisuallyHidden>
                    </motion.div>

                    <motion.div
                      className="flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <button
                        onClick={previousImage}
                        className="bg-foreground text-background fixed bottom-12 flex aspect-square h-12 -translate-x-24 items-center justify-center rounded-full text-sm md:top-1/2 md:bottom-auto md:left-[5vw] md:translate-x-0 md:-translate-y-1/2"
                      >
                        ←
                      </button>
                      <div className="text-muted fixed bottom-12 left-1/2 flex h-12 -translate-x-1/2 items-center justify-center rounded-full px-4 text-sm tabular-nums">
                        {currentImagePath!.index + 1} / {images.length}
                      </div>
                      <button
                        onClick={nextImage}
                        className="bg-foreground text-background fixed bottom-12 flex aspect-square h-12 translate-x-24 items-center justify-center rounded-full text-sm md:top-1/2 md:right-[5vw] md:bottom-auto md:translate-x-0 md:-translate-y-1/2"
                      >
                        →
                      </button>
                    </motion.div>
                  </div>
                </DialogContent>
              </div>
            </DialogPortal>
          )}
        </AnimatePresence>
      </Dialog>
    </>
  );
}

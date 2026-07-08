sed -i 's/absolute bottom-full left-1\/2 -translate-x-1\/2 sm:left-0 sm:translate-x-0 mb-3 p-4 w-64 sm:w-\[320px\]/absolute bottom-full left-1\/2 -translate-x-1\/2 sm:left-0 sm:translate-x-0 mb-3 p-4 w-[calc(100vw-32px)] max-w-[320px] sm:w-auto sm:max-w-none/g' app/page.tsx
sed -i 's/<div className="space-y-2 text-\[10px\] font-mono">/<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[10px] font-mono">/g' app/page.tsx
sed -i 's/<div className="flex items-center justify-between">/<div className="flex items-center justify-between gap-4">/g' app/page.tsx
sed -i 's/<span className="flex items-center gap-2">/<span className="flex items-center gap-2 whitespace-nowrap">/g' app/page.tsx

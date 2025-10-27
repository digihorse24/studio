"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus, Sparkles } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameMonth, isToday, addMonths, subMonths, parseISO, isSameDay } from 'date-fns';
import { de } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Termin } from '@/lib/types';
import { AISuggestionModal } from './ai-suggestion-modal';

type Event = Termin & { title: string; pferdName?: string; kundeName?: string; };

interface CalendarClientProps {
    events: Event[];
}

const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

export function CalendarClient({ events }: CalendarClientProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [isAiModalOpen, setIsAiModalOpen] = useState(false);

    const firstDayCurrentMonth = startOfMonth(currentMonth);
    const lastDayCurrentMonth = endOfMonth(currentMonth);

    const days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: lastDayCurrentMonth,
    });

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl">
                    {format(currentMonth, 'MMMM yyyy', { locale: de })}
                </CardTitle>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={prevMonth}><ChevronLeft className="h-4 w-4" /></Button>
                    <Button variant="outline" size="icon" onClick={nextMonth}><ChevronRight className="h-4 w-4" /></Button>
                    <Button onClick={() => setIsAiModalOpen(true)}>
                        <Sparkles className="mr-2 h-4 w-4" />
                        KI Vorschläge
                    </Button>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Termin anlegen
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-7 gap-px border-t border-l border-border bg-border">
                    {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(day => (
                        <div key={day} className="py-2 text-center font-semibold text-sm bg-card">{day}</div>
                    ))}
                    {days.map((day, dayIdx) => {
                        const dayEvents = events.filter(event => isSameDay(parseISO(event.date), day));
                        return (
                            <div
                                key={day.toString()}
                                className={cn(
                                    dayIdx === 0 && colStartClasses[getDay(day) === 0 ? 6 : getDay(day) - 1],
                                    "relative p-2 bg-card min-h-[120px]"
                                )}
                            >
                                <time
                                    dateTime={format(day, 'yyyy-MM-dd')}
                                    className={cn(
                                        "text-sm font-medium",
                                        isToday(day) && "flex h-6 w-6 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground",
                                        !isSameMonth(day, currentMonth) && "text-muted-foreground"
                                    )}
                                >
                                    {format(day, 'd')}
                                </time>
                                <div className="mt-1 space-y-1">
                                    {dayEvents.slice(0, 2).map(event => (
                                        <div key={event.id} className="p-1.5 rounded-md bg-primary/10 text-primary-foreground">
                                            <p className="text-xs font-semibold text-primary">{event.title}</p>
                                            <p className="text-[10px] text-primary/80 truncate">{event.time} - {event.pferdName}</p>
                                        </div>
                                    ))}
                                    {dayEvents.length > 2 && (
                                        <p className="text-xs text-muted-foreground mt-1">+{dayEvents.length - 2} weitere</p>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
            <AISuggestionModal 
                open={isAiModalOpen} 
                onOpenChange={setIsAiModalOpen} 
                calendarData={JSON.stringify(events, null, 2)}
            />
        </Card>
    );
}

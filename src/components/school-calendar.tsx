'use client';

import * as React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from './ui/card';

export default function SchoolCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const holidays = [new Date(2024, 9, 25), new Date(2024, 9, 31)];
  const events = [new Date(2024, 9, 15), new Date(2024, 10, 5)];

  return (
    <section
      id="calendar"
      className="w-full bg-secondary py-16 md:py-24 lg:py-32"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Calendar
            </div>
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-5xl">
              Important Dates
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Keep track of school holidays, events, and examination schedules.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-4xl flex-col items-center gap-8 md:flex-row md:items-start">
          <Card className="flex-shrink-0">
            <CardContent className="p-2">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
                modifiers={{
                  holidays: holidays,
                  events: events,
                }}
                modifiersStyles={{
                  holidays: {
                    backgroundColor: 'hsl(var(--destructive))',
                    color: 'hsl(var(--destructive-foreground))',
                  },
                  events: {
                    backgroundColor: 'hsl(var(--accent))',
                    color: 'hsl(var(--accent-foreground))',
                  },
                }}
              />
            </CardContent>
          </Card>
          <div className="mt-4 flex-grow space-y-4 md:mt-0">
            <h3 className="font-headline text-xl font-semibold">Legend</h3>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded-full bg-destructive" />
              <span>Holiday</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded-full bg-accent" />
              <span>School Event</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 rounded-full bg-primary" />
              <span>Selected Date</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

require 'rubygems'
require 'date'

date = nil


if ARGV.first then
    begin
        date = Date.parse(ARGV.first)
    rescue
        date = Date.today
    end
end


if (date.nil? or date < Date.today - 365*20) then
#don't bother with days more than 20 years ago
    date = Date.today
end

p date.strftime('%s')


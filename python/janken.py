import random
import sys

select = [[1,'グー'], [2, 'チョキ'], [3, 'パー']]
for i in range(len(select)):
    print('%s：%s' %(i+1, select[i][1]))

cpu = random.randint(1, 3)
try:
    myslf = int(input('1～3を選択してください：'))
except ValueError:
    print("1～3を入力してください")
    sys.exit()

def prnt():
    print('自分：' + select[myslf-1][1])
    print('相手：' + select[cpu-1][1])

def win():
    print('勝ちです')

def lose():
    print('負けです')

if myslf == cpu:
    prnt()
    print('あいこです')
else:
    if myslf == 1:
        if cpu == 2:
            prnt()
            win()
        else:
            prnt()
            lose()
    elif myslf == 2:
        if cpu == 1:
            prnt()
            lose()
        else:
            prnt()
            win()
    elif myslf == 3:
        if cpu == 1:
            prnt()
            win()
        else:
            prnt()
            lose()
    else:
        print('1～3を入力してください')


